import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import "../login.css";
import { add_user, auth, db } from "../../../Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Emessage, setEmessage] = useState(<p></p>);
  const [Pmessage, setPmessage] = useState(<p></p>);
  const [errM, setErrM] = useState(<p></p>);
  const history = useHistory();
  const sign_in = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const sign_up = async (event) => {
    event.preventDefault();
    if (username == "") {
      setEmessage(<p>invalid username format</p>);
      setErrM(<p></p>);
      setPmessage(<p></p>);
    } else {
      let userExists = false;
      const colRef = collection(db, "user");
      const checkUser = query(colRef, where("username", "==", username));
      const querySnapshot = await getDocs(checkUser);
      querySnapshot.forEach((doc) => {
        userExists = true;
        setEmessage(<p>username already exists</p>);
        setErrM(<p></p>);
        setPmessage(<p></p>);
      });
      if (userExists == false) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((auth) => {
            if (auth) {
              add_user(username, password, email)
                .then((auth) => {
                  history.push("/");
                })
                .catch((err) => {
                  console.log(err);
                  setErrM(<p>Server error</p>);
                  setPmessage(<p></p>);
                  setEmessage(<p></p>);
                });
            }
          })
          .catch((error) => {
            if (password.length < 6) {
              setPmessage(<p>password must be at least 6 characters long</p>);
              setEmessage(<p></p>);
              setErrM(<p></p>);
            } else {
              console.log(error.code);
              var err = error.code.replace("auth/", "");
              setErrM(<p>{err}</p>);
              setPmessage(<p></p>);
              setEmessage(<p></p>);
            }
          });
      }
    }
  };

  return (
    <div className="register">
      <img
        src={process.env.PUBLIC_URL + "/logo.svg"}
        alt="shop logo"
        height="250"
        width="250"
      />
      <h3>Register</h3>
      <div className="sign-up-form">
        <form className="form">
          <h4>Username</h4>
          {Emessage}
          <input
            className="text-lowercase"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
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
          <h4>Email</h4>
          {errM}
          <input
            type="email"
            id="email"
            name="email"
            className="text-lowercase"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button className="submit" onClick={sign_up}>
            Sign up
          </button>
          <h4>if you have an account please sign in</h4>
          <button className="submit" onClick={sign_in}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
