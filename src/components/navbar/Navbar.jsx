import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import orderStore from "../../stores/OrderStore";
const Navbar = ({ locale, handleChange }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { order, setOrder, getOrder, errorMessage } = orderStore();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleTrackOrder = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleAlertOrder = async () => {
    await getOrder(orderId);
    if (errorMessage == "") {
      alert("Invalid order Id");
      return;
    }
    setIsPopupOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src="src\assets\logo.png" alt="logo" />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Prices</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Contact Support</NavLink>
            </li>
          </ul>
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <button onClick={handleTrackOrder}>track order</button>
            <button>sign in</button>

            <select value={locale} onChange={handleChange}>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </ul>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>
              &times;
            </span>
            <label htmlFor="orderIdInput">Enter Order ID:</label>
            <input
              type="text"
              id="orderIdInput"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={handleAlertOrder}>Search Order</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);
