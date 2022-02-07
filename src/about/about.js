import React from "react";
import "./about.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="app">
      {/* <Header /> */}

      <div className="about">
        <Link to="home">
          <img src="logo.svg" alt="shop logo" height="350" width="550" />
        </Link>
        <h2>About us</h2>
        <div className="about_text">
          <h5>General overview</h5>
          <p>
            Acaya shopping is an online shop that offers its customer services
            and products.
          </p>
          <h5>What Acaya offers</h5>
          <p>
            Acaya offers a range of products from retail shops or other sources.
          </p>
          <h5>Acaya's goal</h5>
          <p>
            Acaya's goal is to reach out to customers in need and assist them as
            much as possible.
          </p>
          <p>
            Acaya aims to make the customer feel welcomed and be able to feel
          </p>
          <p>comfortable doing purchases while Acaya takes care of the</p>
          <p> small little things</p>

          <br />
        </div>
      </div>
    </div>
  );
}
export default About;
