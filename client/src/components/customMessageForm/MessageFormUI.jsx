import { useState } from "react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";
import Checkbox from "./Checkbox";

const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
  handleEncrypt,
  encrypt,
  handleSecret,
  secret,
}) => {
  const [preview, setPreview] = useState();

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            src={preview}
            alt="message-form-preview"
            className="message-form-preview-image"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-icons">
          <div
            onClick={() => {
              handleEncrypt();
            }}
          >
            <Checkbox encrypt={encrypt} />
          </div>
          {encrypt && (
            <div className="message-form_secret">
              <input type="text" value={secret} onChange={handleSecret} />
            </div>
          )}
          |
        </div>

        <div className="message-form-input-container">
          <input
            type="text"
            className="message-form-input"
            value={message}
            onChange={handleChange}
            placeholder="Enviar mensaje..."
            onKeyDown={handleKeyDown}
          />
          {appendText && (
            <input
              type="text"
              className="message-form-assist"
              disabled="disabled"
              value={`${message} ${appendText}`}
            />
          )}
        </div>
        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.docx,.pdf"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              handleSubmit();
              setPreview("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUI;
