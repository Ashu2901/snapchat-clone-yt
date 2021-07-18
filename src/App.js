import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./components/WebcamCapture/WebcamCapture";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Preview from "./components/Preview/Preview";
import Chats from "./components/Chats/Chats";
import ChatView from "./components/Chats/ChatView/ChatView";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/appSlice";
import Login from "./components/Login/Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg"
              alt=""
            />
            <div className="app__body">
              <div className="app_bodyBackground">
                <Switch>
                  <Route exact path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
