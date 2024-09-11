import PropTypes from "prop-types";
import Footer1 from "../assets/footer1.jpeg";
import Footer2 from "../assets/footer2.jpeg";
import Footer3 from "../assets/footer3.jpeg";
import Footer4 from "../assets/footer4.jpeg";
import Footer5 from "../assets/footer5.jpeg";
import "../css/footer.css";

const Footer = ({ isLoginPage }) => {
  return (
    <footer className={isLoginPage ? "login-footer" : "footer"}>
      <div className="footer-content">
        <div className="footer-images">
          <img
            src={Footer1}
            alt="Footer Design 1"
            className={isLoginPage ? "footer-image-small" : "footer-image"}
          />
          <img
            src={Footer2}
            alt="Footer Design 2"
            className={isLoginPage ? "footer-image-small" : "footer-image"}
          />
          <img
            src={Footer3}
            alt="Footer Design 3"
            className={isLoginPage ? "footer-image-small" : "footer-image"}
          />
          <img
            src={Footer4}
            alt="Footer Design 4"
            className={isLoginPage ? "footer-image-small" : "footer-image"}
          />
          <img
            src={Footer5}
            alt="Footer Design 5"
            className={isLoginPage ? "footer-image-small" : "footer-image"}
          />
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isLoginPage: PropTypes.bool,
};

export default Footer;
