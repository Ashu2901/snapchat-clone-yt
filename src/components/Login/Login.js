import React from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { login } from "../../features/appSlice";
import { auth, provider } from "../../firebase.js";
function Login() {
  const dispatch = useDispatch();

  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg"
          alt=""
        />
        <Button variant="outlined" onClick={signin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
