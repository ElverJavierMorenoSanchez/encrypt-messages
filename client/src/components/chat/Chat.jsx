import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";

import { Header, MessageBubble, StandarMessageForm } from "..";

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        timezoneOffset={19}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessage={(props) => (
          <MessageBubble creds={props} chatProps={chatProps} user={user} />
        )}
        renderMessageForm={(props) => {
          return <StandarMessageForm props={props} activeChat={chatProps} />;
        }}
      />
    </div>
  );
};

export default Chat;
