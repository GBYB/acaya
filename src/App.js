import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login/login";
import Cart from "./cart/cart";
import Register from "./login/register/register";
import Home from "./homepage/homepage";
import Checkout from "./checkout/checkout";
import About from "./about/about";
import Purchase from "./purchase/purchase";
import Item from "./product/item";
//import Header from "./header/header";
import { HashRouter as Router, Route } from "react-router-dom";
import Profile from "./profile/profile";
import Header from "./header/header";
import Tracker from "./tracker/tracker";
import ForgotPass from "./login/forgotPass";
import EditProfile from "./profile/editProfile";
// import { signOut } from "@firebase/auth";
// import { auth } from "./Firebase";

function App() {
  // var user = auth.currentUser;
  // window.addEventListener("beforeunload", (event) => {
  //   event.preventDefault();
  //   if (user !== null) signOut(auth);
  // });
  return (
    <Router>
      <div className="app">
        <Route exact path="/home">
          <Header />
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route exact path="/cart">
          <Header />
          <Cart />
        </Route>
        <Route exact path="/about">
          <Header />
          <About />
        </Route>
        <Route exact path="/purchase">
          <Header />
          <Purchase />
        </Route>
        <Route exact path="/item">
          <Header />
          <Item render={(props) => <Item {...props} />} />
        </Route>
        <Route exact path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route exact path="/tracker">
          <Header />
          <Tracker />
        </Route>
        <Route exact path="/editProfile">
          <Header />
          <EditProfile />
        </Route>
        <Route exact path="/forgotPass">
          <ForgotPass />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </div>
    </Router>
  );
}
export default App;
