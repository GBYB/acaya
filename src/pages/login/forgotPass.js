import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get_userId, resetPassword } from "../../Firebase";
import "./forgotPass.css";
toast.configure();
function ForgotPass() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Pmessage, setPmessage] = useState(<p></p>);
  var fail = false;
  if (username !== undefined || username !== "") {
    const getEmail = async () => {
      await get_userId(username)
        .then((getdata) => {
          setEmail(getdata.data.email);
        })
        .catch((err) => {
          console.log(err);
          fail = true;
        });
    };
    getEmail();
  }

  const resetPass = async (event) => {
    event.preventDefault();
    if (!fail) {
      if (username !== undefined || username !== "") {
        if (email !== undefined) {
          console.log(email);
          const reset = async () => {
            await resetPassword(email)
              .then(() => {
                console.log("Resetting");
                toast("Email sent for password reset");
                history.push("/");
              })
              .catch((err) => {
                console.log(err);
              });
          };
          reset();
        }
      }
    } else if (fail) {
      setPmessage(<p>username not found</p>);
      console.log("fqil");
    }
  };
  return (
    <div className="forgotPass">
      <div className="resetPass">
        <p>Enter your username to retrieve your password</p>
        <form className="form-pass">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="submit" onClick={resetPass}>
            Reset Password
          </button>
        </form>
        {Pmessage}
      </div>
    </div>
  );
}

export default ForgotPass;
