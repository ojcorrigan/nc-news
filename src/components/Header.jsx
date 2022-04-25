import { Link } from "react-router-dom";

export const Header = ({ setUser, user }) => {
  return (
    <nav>
      <h1 className="headTitle">Welcome to Northcoders News</h1>
      <Link to="/" id="homeButtonLink">
        <button className="headButton" id="home">
          Home
        </button>
      </Link>
      {!user.username && (
        <button
          className="headButton"
          id="add"
          onClick={() => {
            setUser({ username: "cooljmessy", role: "user" });
          }}
        >
          Login
        </button>
      )}
      {user.username && (
        <p id="loggedIn">You're logged in as {user.username}</p>
      )}
    </nav>
  );
};

export default Header;
