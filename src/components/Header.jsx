import React from "react";

export const Header = () => {
  return (
    <nav>
      <h1 className="headTitle">Welcome to Northcoders News</h1>
      <button className="headButton" id="home">
        Home
      </button>
      <button className="headButton" id="add">
        Add Article
      </button>
    </nav>
  );
};

export default Header;
