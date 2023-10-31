import React from "react";
import "./Navbar.css";
import Temple from "../assets/temple.svg";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();

  const { logout, isPending } = useLogout(); // Call the useLogout hook

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <Link to="/">
            <div className="logo-flex">
              <img src={Temple} alt="logo" />
              <span>Projectify</span>
            </div>
          </Link>
        </li>

        {!user && (
          <div className="auth-div">
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </div>
        )}

        {user && (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
