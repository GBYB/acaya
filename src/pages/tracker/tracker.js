import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./tracker.css";
import "../purchase/purchase.css";
import { User_Context } from "../../useContext";
import { get_username, setBudget } from "../../Firebase";
import BarChart from "./barchart";

function Tracker() {
  const [username, setusername] = useState("");
  const { userEmail } = User_Context();
  const [budget, setbudget] = useState(0);
  const [ref, setRef] = useState({});
  const [addbudget, setAddbudget] = useState(0);
  useEffect(() => {
    if (userEmail !== undefined) {
      const getUser = async () => {
        await get_username(userEmail)
          .then((element) => {
            setusername(element.data.username);
            setRef(element);
            setbudget(element.data.budget);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getUser();
    }
  }, [userEmail, username]);
  var handleBudget;
  var handleAddBudget;
  if (username !== undefined || username !== "") {
    handleBudget = async (event) => {
      event.preventDefault();
      await setBudget(budget, ref).catch((err) => {
        console.log(err);
      });
    };
    handleAddBudget = async (event) => {
      event.preventDefault();
      if (addbudget !== 0) {
        var total = budget + addbudget;
        setbudget(total);
        event.preventDefault();
        await setBudget(total, ref)
          .then(() => {
            // console.log(total, budget);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
  }

  return (
    <div className="tracker">
      <div className="topTrack">
        <Link to="home">
          <img
            src={process.env.PUBLIC_URL + "/logo.svg"}
            alt="shop logo"
            height="350"
            width="550"
          />
        </Link>
        <h3>take control of your purchases</h3>
        <hr />
        <div className="budget">
          <h4>handle how much you spend</h4>
          <p>
            here you can set a limit for a budget for your basket purchases so
            that you cannot exceed this value.
          </p>
          <p>
            Remember to put the budget 0 if you want to purchase freely and to
            refill it every once in a while
          </p>
          <p>
            make sure to check your budget after your purchases so that it does
            not hit 0
          </p>

          <form>
            <input
              className="budget_input"
              placeholder="budget"
              value={budget}
              onChange={(e) =>
                isNaN(Math.abs(e.target.value))
                  ? 0
                  : setbudget(Math.abs(e.target.value))
              }
            ></input>
            <button className="budget_btn" onClick={handleBudget}>
              Set Budget
            </button>
            <input
              className="budget_input"
              placeholder="add to budget value"
              value={addbudget}
              onChange={(e) =>
                isNaN(Math.abs(e.target.value))
                  ? 0
                  : setAddbudget(Math.abs(e.target.value))
              }
            ></input>
            <button className="budget_btn" onClick={handleAddBudget}>
              Add to Budget
            </button>
          </form>
        </div>
        <div className="budget">
          <h3>Track your purchases here</h3>
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default Tracker;
