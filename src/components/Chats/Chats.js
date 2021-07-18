import React, { useState, useEffect } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { db, auth } from "../../firebase";
import Chat from "./Chat/Chat";
import { selectUser } from "../../features/appSlice";
import { resetCameraImage } from "../../features/cameraSlice";

import RadioButtonUnCheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user?.profilePic}
          onClick={() => {
            auth.signOut();
          }}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>

        <ChatBubbleIcon className="chats__chatIcon" />
      </div>

      <div className="chat__posts">
        {posts?.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              profilePic={profilePic}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
            />
          )
        )}
      </div>

      <RadioButtonUnCheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
