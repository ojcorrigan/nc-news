import { Link } from "react-router-dom";

export const Header = (user) => {
  return (
    <nav>
      <h1 className="headTitle">Welcome to Northcoders News</h1>
      <Link to="/" id="homeButtonLink">
        <button className="headButton" id="home">
          Home
        </button>
      </Link>
      {/* TODO - set up a login button */}
      {!user.userName && (
        <button className="headButton" id="add">
          Login
        </button>
      )}
    </nav>
  );
};

export default Header;
