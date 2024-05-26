import React, { useState } from "react";
import styles from "./NavBar.module.css";

function NavBar() {
  // State to manage navbar collapse
  const [collapsed, setCollapsed] = useState(true);

  // Function to toggle navbar collapse
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Utility Apps
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Conditionally render navbar collapse */}
        <div
          className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={styles.navitem}>
              <a className="nav-link active" aria-current="page" href="todo">
                To Do
              </a>
            </li>
            <li className={styles.navitem}>
              <a className="nav-link active" aria-current="page" href="notes">
                Note
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
