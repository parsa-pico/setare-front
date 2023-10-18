import React, { useState } from "react";
import { Link } from "react-router-dom";
import { clearToken, getDecodedToken } from "../Services/authService";

const MobileMenuBar = () => {
  const user = getDecodedToken();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  function MyLink({ children, to, onClick, ...rest }) {
    return (
      <li>
        <Link
          {...rest}
          onClick={(e) => {
            if (onClick) onclick(e);
            toggleMenu();
          }}
          style={{ textDecoration: "none" }}
          to={to}
        >
          {children}
        </Link>
      </li>
    );
  }
  return (
    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
      <div className="menu-button" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`} />
        <div className={`bar ${menuOpen ? "open" : ""}`} />
        <div className={`bar ${menuOpen ? "open" : ""}`} />
      </div>
      {menuOpen && (
        <ul className="menu-items">
          <MyLink to={"/courses"}>دوره ها</MyLink>
          {user.isAdmin && (
            <span>
              <hr />
              <MyLink to={"/students"}>کاربران</MyLink>
            </span>
          )}
          <hr />
          <div
            onClick={(e) => {
              e.preventDefault();

              clearToken();
              window.location = "/";
            }}
            className="text-danger pb-4"
          >
            خروج
          </div>
        </ul>
      )}
    </div>
  );
};

export default MobileMenuBar;
