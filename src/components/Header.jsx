import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import { useState } from "react";
import { IconUser, IconLogout } from "@tabler/icons-react";
import "../css/header.css";
import { logout } from "../utils/auth.js";

const Header = ({ user }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo-header">
        <img src={logo} className="logo" alt="Logo" />
      </div>
      <div className="heading">IMS</div>
      <div className="profile-section">
        <div className="profile-icon" onClick={toggleProfileMenu}>
          <IconUser size={26} />
        </div>
        {isProfileMenuOpen && user && (
          <div className="profile-menu">
            <div className="profile-details">
              <p>
                <strong>{user.fullName}</strong>
              </p>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
              <p>Department: {user.department}</p>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              <IconLogout size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
