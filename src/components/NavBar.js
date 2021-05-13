import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../client";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    logout().then(() => {
      // clear the user from state
      setUser(null);
    });
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
