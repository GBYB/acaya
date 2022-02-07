import { useHistory } from "react-router-dom";
import "./login.css";
import React, { useState } from "react";
import { auth, get_userId } from "../Firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Emessage, setEmessage] = useState(<p></p>);
  const [Pmessage, setPmessage] = useState(<p></p>);
  const [errM, setErrM] = useState(<p></p>);
  const [email, setEmail] = useState("");
  const register = (event) => {
    event.preventDefault();
    history.push("/register");
  };

  const signin = async (event) => {
    event.preventDefault();
    // const user = auth.currentUser;
    // console.log(user);
    // if (user === null) {
    if (username === "") {
      setEmessage(<p>invalid username format</p>);
      setErrM(<p></p>);
      setPmessage(<p></p>);
    } else if (password === "") {
      setEmessage(<p></p>);
      setErrM(<p></p>);
      setPmessage(<p>invalid password format</p>);
    } else {
      await get_userId(username)
        .then((getdata) => {
          setEmail(getdata.data.email);
          if (email === undefined) {
            setPmessage(<p></p>);
            setEmessage(<p>User does not exist</p>);
            setErrM(<p></p>);
          }
          signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
              history.push("/home");
            })
            .catch((error) => {
              console.log(error.message);
              setPmessage(<p>Invalid username or password</p>);
              setEmessage(<p></p>);
              // setErrM(<p>{error ? error.message : ""}</p>);
            });
        })
        .catch((error) => {
          setPmessage(<p>Username not found</p>);
          console.log(error.message);
          // setErrM(<p>{error.message}</p>);
          // setPmessage(<p></p>);
          // setEmessage(<p></p>);
        });
    }
    // } else {
    //   setEmessage(<p>A user is already signed in on this device</p>);
    // }
  };

  return (
    <div className="login">
      <img src="logo.svg" alt="shop logo" height="250" width="250" />
      <h3>Login</h3>
      <div className="sign-in-form">
        <form className="form">
          <h4>Username</h4>
          {Emessage}
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h4>Password</h4>
          {Pmessage}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errM}
          <button type="submit" className="submit" onClick={signin}>
            Sign in
          </button>
        </form>
        <br />
        <a href="/forgotPass">Forgot Password?</a>
        <p>don't have an account? follow the link below</p>

        <button className="create" onClick={register}>
          Create Account
        </button>
      </div>
    </div>
  );
};
export default Login;
