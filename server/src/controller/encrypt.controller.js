import fs from "fs";
import crypto from "crypto";
import path from "path";

const algorithm = "aes-256-ctr";

const encrypt = (buffer, key) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createDecipheriv(algorithm, key, iv);

  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

  return result;
};

const decrypt = (encrypted, key) => {
  const iv = encrypted.slice(0, 16);
  encrypted = encrypted.slice(16);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return result;
};

export const dencryptFile = async (req, res) => {
  const { filename, secret } = req.params;

  var _secret = secret;

  _secret = crypto
    .createHash("sha256")
    .update(String(_secret))
    .digest("base64")
    .substring(0, 32);

  try {
    const newName = `desencriptado-${filename.substring(11, filename.length)}`;

    console.log(newName);

    setTimeout(() => {
      fs.readFile(`./uploads/${filename}`, (err, file) => {
        if (err) return console.log(err);

        const decryptedFile = decrypt(file, _secret);
        fs.writeFile(`./uploads/${newName}`, decryptedFile, (error, _file) => {
          if (error)
            return res
              .status(404)
              .json({ message: "Error al desencriptar el archivo" });

          const file = path.resolve(`./uploads/${newName}`);

          res.status(200).download(file);

          setTimeout(() => {
            fs.unlinkSync(`./uploads/${newName}`, (error) => {
              console.log(error.message);
            });
          });
        });
      });
    }, 5000);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getFile = async (req, res) => {
  const { filename } = req.params;
  const file = path.resolve(`./uploads/${filename}`);
  res.download(file);
};

export const encryptFile = async (req, res) => {
  const EDFile = req.files.file;
  const { secret } = req.body;

  var _secret = secret;

  _secret = crypto
    .createHash("sha256")
    .update(String(_secret))
    .digest("base64")
    .substring(0, 32);

  try {
    EDFile.mv(`./uploads/${EDFile.name}`, (err) => {
      if (err) return res.status(500).send({ message: err });
    });

    setTimeout(() => {
      fs.readFile(`./uploads/${EDFile.name}`, (err, file) => {
        if (err) return console.log(err);

        const encryptedFile = encrypt(file, _secret);

        fs.writeFile(
          `./uploads/encriptado-${EDFile.name}`,
          encryptedFile,
          (error, _) => {
            setTimeout(() => {
              fs.unlinkSync(`./uploads/${EDFile.name}`, (error) => {
                console.log(error.message);
              });
            });

            if (error)
              return res
                .status(404)
                .json({ message: "Error al encriptar el archivo" });

            res.status(200).json({ data: `encriptado-${EDFile.name}` });
          }
        );
      });
    }, 3000);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
