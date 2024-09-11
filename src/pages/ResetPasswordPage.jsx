import { useState } from "react";
import "../css/resetPasswordPage.css";
import logo from "../assets/react.svg";
import { resetPassword } from "../utils/auth";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      await resetPassword(token, newPassword);
      setSuccessMessage("Your password has been successfully reset.");
    } catch (err) {
      setError("Failed to reset password. Please try again.", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="left-container">
        <img src={logo} className="logo" alt="Logo" />
        <h1>IMS</h1>
        <h1>Integrated</h1>
        <h1>Management</h1>
        <h1>System</h1>
      </div>
      <div className="right-container">
        <div className="reset-password-container">
          <h2>Reset Password</h2>
          {error && <div className="error-message">{error}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="form-control"
                placeholder=" "
              />
              <label className="form-label">New Password</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-control"
                placeholder=" "
              />
              <label className="form-label">Confirm Password</label>
            </div>
            <button type="submit" className="reset-button" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
