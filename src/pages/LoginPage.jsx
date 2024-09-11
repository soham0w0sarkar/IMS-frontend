import { useState } from "react";
import "../css/loginPage.css";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import { login, forgotPassword } from "../utils/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isForgotPassword) {
      try {
        await forgotPassword(email);
        setError(
          "Password reset email sent successfully. Please check your inbox.",
        );
      } catch (err) {
        console.error(err);
        setError("Failed to send password reset email. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await login({ email, password });
      } catch (err) {
        console.error(err);
        setError("Failed to login. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
    setError("");
  };

  const handleBackToLoginClick = () => {
    setIsForgotPassword(false);
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-app">
        <div className="left-container">
          <img src={logo} className="logo" alt="Logo" />
          <h1>IMS</h1>
          <h1>Integrated</h1>
          <h1>Management</h1>
          <h1>System</h1>
        </div>
        <div className="right-container">
          <div
            className={`login-container ${isForgotPassword ? "forgot-password-mode" : ""}`}
          >
            <h2>{isForgotPassword ? "Forgot Password" : "Login"}</h2>
            <div className="error-container">
              {error && <div className="error-message">{error}</div>}
            </div>
            <form onSubmit={handleSubmit}>
              {isForgotPassword ? (
                <>
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control"
                      placeholder=" "
                    />
                    <label className="form-label">Email</label>
                  </div>
                  <div className="back-to-login">
                    <a href="#" onClick={handleBackToLoginClick}>
                      Back to Login
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control"
                      placeholder=" "
                    />
                    <label className="form-label">Email</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control"
                      placeholder=" "
                    />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="forgot-password">
                    <a href="#" onClick={handleForgotPasswordClick}>
                      Forgot Password?
                    </a>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : isForgotPassword
                    ? "Continue"
                    : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer isLoginPage={true} />
    </div>
  );
}

export default LoginPage;
