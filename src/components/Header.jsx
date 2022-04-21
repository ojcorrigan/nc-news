import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav>
      <h1 className="headTitle">Welcome to Northcoders News</h1>
      <Link to="/" id="homeButtonLink">
        <button className="headButton" id="home">
          Home
        </button>
      </Link>
      <button className="headButton" id="add">
        Add Article
      </button>
    </nav>
  );
};

export default Header;
