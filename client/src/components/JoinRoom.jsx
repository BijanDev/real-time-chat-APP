import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./joinRoom.css"

const socket = io.connect("http://localhost:3050");

export default function JoinRoom() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" || room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>Join A Room</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Enter Room id"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <br />
          <br />
          <button type="button" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}
