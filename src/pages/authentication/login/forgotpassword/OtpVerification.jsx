import OtpInput from "./components/OtpInput";
import "./OtpVerification.css";
import { IoClose } from "react-icons/io5";

export default function OtpVerification({ setAuthScreen }) {
  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        {/* Close button */}
        <button 
          className="close-btn"
          onClick={() => setAuthScreen("login")}
        >
          <IoClose/>
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Verify OTP clicked");
          }}
        >
          {/* Title */}
          <h3 className="auth-title">Verify OTP</h3>

          {/* Subtitle */}
          <p className="auth-subtitle">
            Enter the 4-digit code sent to your email
          </p>

          {/* OTP Input */}
          <div className="otp-wrapper">
            <OtpInput />
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100 mt-4" onClick={()=>setAuthScreen("resetPassword")}>
            Verify OTP
          </button>

          {/* Resend */}
          <p className="switch-text mt-3">
            Didn't receive code? <span>Resend</span>
          </p>
        </form>

      </div>
    </div>
  );
}