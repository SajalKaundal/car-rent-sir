import "./ForgotPassword.css";
import { IoClose } from "react-icons/io5";

function ForgotPassword({ setAuthScreen }) {
  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        {/* Close Button */}
        <button 
          className="close-btn"
          onClick={() => setAuthScreen("login")}
        >
          <IoClose/>
        </button>

        {/* Title */}
        <h3 className="auth-title">Forgot Password</h3>

        {/* Subtitle */}
        <p className="auth-subtitle">
          Don't worry, it happens. Enter your registered email.
        </p>

        {/* Input */}
        <div className="form-group mt-3">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Enter your email"
          />
        </div>

        {/* Button */}
        <button className="btn btn-primary w-100 mt-4" onClick={()=>setAuthScreen("otpVerification")}>
          Send Code
        </button>

        {/* Back to login */}
        <p className="switch-text mt-3">
          Back to{" "}
          <span onClick={() => setAuthScreen("login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;