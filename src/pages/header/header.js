import React from "react";
import "./header.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { signOut } from "@firebase/auth";
import { useHistory } from "react-router";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";
function Header() {
  const history = useHistory();
  const sign_out = async (event) => {
    event.preventDefault();
    signOut(auth)
      .then((auth) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="header">
      <Navbar>
        <Container className="left">
          {/**Logo */}
          <Link className="link" to="home">
            <img
              src={process.env.PUBLIC_URL + "/logo.svg"}
              width="90"
              height="90"
              className="d-inline-block align-top"
              alt="shop logo"
            />
            {/** Title of the logo */}
            <Navbar.Brand>Acaya shopping</Navbar.Brand>
          </Link>
        </Container>

        <Container className="right">
          {/** About Us Page */}
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/acaya/about">About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          {/** Accounts and Services list */}
          <Container className="account">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Accounts&Services" id="basic-nav-dropdown">
                  <NavDropdown.Item href="purchase">Purchases</NavDropdown.Item>
                  <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="tracker">Tracker</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={sign_out}>
                    SignOut
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
          {/** Shopping cart */}
          <Container className="cart-item">
            <Nav className="me-auto">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link href="cart">Cart</Nav.Link>
              </Navbar.Collapse>
            </Nav>
            {/* <div className="cart_image">
               <button className="cart_bag">
                 <img
                   src="/bag.svg"
                   width="25"
                   height="35"
                   className="d-inline-block align-top"
                   alt="bag"
                 />
                 <span className="cart_count">10000</span>
               </button>
             </div> */}
          </Container>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
