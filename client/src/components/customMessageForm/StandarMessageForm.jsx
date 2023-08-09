import { useState } from "react";
import { MessageFormUI } from "..";
import CryptoJS from "crypto-js";
import axios from "axios";

const StandarMessageForm = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [encrypt, setEncrypt] = useState(false);
  const [secret, setSecret] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSecret = (e) => {
    setSecret(e.target.value);
  };

  const handleSubmit = async (e) => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);

    if (encrypt && secret === "") {
      return alert("Coloca una clave");
    }

    if (attachment && encrypt) {
      const formData = new FormData();
      formData.append("file", attachment);
      formData.append("secret", secret);

      const response = await axios.post(
        `${process.env.REACT_APP_API_ULR}/uploads/encrypt`,
        formData
      );

      const attachments = attachment
        ? [{ blob: attachment, file: `${attachment.name}` }]
        : [];

      const form = {
        attachments,
        created: date,
        sender_username: props.username,
        text: response.data.data,
      };

      props.onSubmit(form);
    } else {
      const attachments = attachment
        ? [{ blob: attachment, file: `${attachment.name}` }]
        : [];

      const form = {
        attachments,
        created: date,
        sender_username: props.username,
        text: encrypt
          ? CryptoJS.AES.encrypt(message, secret).toString()
          : message,
        activeChatId: activeChat.id,
      };

      props.onSubmit(form);
    }

    setMessage("");
    setAttachment(null);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleEncrypt = (e) => {
    setEncrypt(!encrypt);
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleKeyDown={handleKeyDown}
      handleEncrypt={handleEncrypt}
      encrypt={encrypt}
      handleSecret={handleSecret}
      secret={secret}
    />
  );
};

export default StandarMessageForm;
