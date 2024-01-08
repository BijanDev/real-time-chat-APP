import React, { useEffect, useState } from "react";
import "./chat.css";

function Chat({ socket, userName, room }) {
  const [currentmessage, setcurrentmessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentmessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentmessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setcurrentmessage("");
    }
  };

  useEffect(() => {
    socket.on("recived_message", (data) => {
      setMessageList((list) => [...list, data]);
      return () => socket.removeListener("receive_message");
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chatHeader">
        <p>Live Chat</p>
      </div>
      <div className="chatBody">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-date">
                    <p>{messageContent.time}</p>
                    <p>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="chatFooter">
        <input
          type="text"
          placeholder="Message..."
          value={currentmessage}
          onChange={(event) => {
            setcurrentmessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>&#10148;</button>
      </div>
    </div>
  );
}

export default Chat;
