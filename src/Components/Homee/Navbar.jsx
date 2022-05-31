import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import logi from "../../images/ramen1.png";
import "../Styles/Navbar.css"
const Navbar = ({ setShow, size}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="logi" src={logi} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navigation-bar" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 navhover">
            <li className="nav-item">
              <Link
                className="nav-link active text-danger rtext ntext"
                aria-current="page"
                to="/"
               
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active text-danger ntext"
                aria-current="page"
                to="/menu"
                onClick={() => setShow()}
              >
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active text-danger ntext"
                aria-current="page"
                to="/membership"
              >
                Membership
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active text-danger ntext mr-70"
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className=" cart nav-link active text-danger ntext mr-70"
                aria-current="page"
                to="/cart"
                onClick={() => setShow()}
                
              >
                
               < FaShoppingCart/>
                
                
                <span>{size}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
