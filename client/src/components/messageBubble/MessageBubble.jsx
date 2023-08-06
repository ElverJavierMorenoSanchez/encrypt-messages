import CryptoJS from "crypto-js";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const MessageBubble = ({ creds, user }) => {
  const band = creds?.message?.sender?.username === user;
  const text = creds.message.text;
  const encrypt = text.substring(0, 2) === "U2";
  const attachments = creds.message.attachments;

  const handleSecret = () => {
    const _secret = prompt("Introduce la clave");

    if (_secret !== null && _secret !== "") {
      alert(CryptoJS.AES.decrypt(text, _secret).toString(CryptoJS.enc.Utf8));
    }
  };

  return (
    <div className={`bubble-message ${band ? "right" : "left"}`}>
      {encrypt ? (
        <div>
          <p className="bubble-message_encrypt" onClick={handleSecret}>
            {attachments.length > 0 ? (
              <Attachments attachments={attachments} text={text} band={band} />
            ) : (
              text
            )}
          </p>
        </div>
      ) : (
        <p>
          <div className="no-encrypt">
            {attachments.length > 0 ? (
              <Attachments attachments={attachments} text={text} band={band} />
            ) : (
              text
            )}
          </div>
        </p>
      )}
    </div>
  );
};

const Attachments = ({ attachments, text, band }) => {
  const handleDecrypt = () => {
    const _secret = prompt("Introduce la clave");

    window.open(
      `${import.meta.env.VITE_BASE_URL}/uploads/decrypt/${text}/${_secret}`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {band && (
        <div>
          {text ? (
            <div
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                background: "#d52a7a",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <DocumentArrowDownIcon
                width={20}
                style={{ color: "black" }}
                onClick={handleDecrypt}
              />
            </div>
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                background: "#ffff",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <DocumentArrowDownIcon width={20} style={{ color: "black" }} />
            </div>
          )}
        </div>
      )}

      <a
        href={
          text === ""
            ? attachments[0].file
            : `${import.meta.env.VITE_BASE_URL}/uploads/${text}`
        }
        className="bubble-message_attachments"
        target="_blank"
        rel="noreferrer"
      >
        {text === ""
          ? attachments[0]?.file.substring(
              attachments[0]?.file.lastIndexOf("/") + 1,
              attachments[0]?.file.lastIndexOf("?")
            )
          : text}
      </a>

      {band || (
        <div>
          {text ? (
            <div
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "10px",
                background: "#d52a7a",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <DocumentArrowDownIcon
                width={20}
                style={{ color: "black" }}
                onClick={handleDecrypt}
              />
            </div>
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "10px",
                background: "#ffff",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <DocumentArrowDownIcon width={20} style={{ color: "black" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
