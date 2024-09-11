import { useState } from "react";
import PropTypes from "prop-types";
import "../css/navBar.css";

const NavBar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("home");

  const handleClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // Notify parent component of tab change
  };

  return (
    <nav className="nav-bar">
      <button
        className={`nav-button ${activeTab === "home" ? "active" : ""}`}
        onClick={() => handleClick("home")}
      >
        Home
      </button>
      <button
        className={`nav-button ${activeTab === "ims" ? "active" : ""}`}
        onClick={() => handleClick("ims")}
      >
        IMS
      </button>
    </nav>
  );
};

NavBar.propTypes = {
  onTabChange: PropTypes.func,
};

export default NavBar;
