import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./Login.css";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../../firebase/firebaseConfig";
import { syncUser } from "../../../services/userServices";

export default function Login({ setAuthScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      const data = await syncUser(user);

      if (!data) {
        throw new Error("Invalid User");
      }

      setAuthScreen(null);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoginError(errorMessage);
      console.log(errorCode + ":" + errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const data = await syncUser(user);
      setAuthScreen("");
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setLoginError(errorMessage);
      // ...
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card shadow-lg">
        <h4 className="text-center mb-2 fw-bold">Login</h4>
        <span className="d-block text-danger" style={{ minHeight: "20px" }}>
          {loginError}
        </span>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "password" : "text"}
              className="form-control pe-5"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {/* Eye icon */}
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </span>
            <span
              className="forgot-password text-primary"
              onClick={() => setAuthScreen("forgotPassword")}
            >
              forgot password
            </span>
          </div>

          {/* Button */}
          <button className="btn btn-primary w-100 mt-2">Login</button>
          {/* {Sign In with google button} */}
          <button
            type="button"
            className="btn w-100 mt-3 google-btn d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="18"
              height="18"
            >
              <path
                fill="#FFC107"
                d="M43.6,20.5H42V20H24v8h11.3C33.7,32.9,29.2,36,24,36c-6.6,0-12-5.4-12-12s5.4-12,12-12c3,0,5.7,1.1,7.8,2.9l5.7-5.7C34.6,6.1,29.6,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20s20-8.9,20-20C44,22.7,43.8,21.6,43.6,20.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3,14.7l6.6,4.8C14.5,16.1,18.9,12,24,12c3,0,5.7,1.1,7.8,2.9l5.7-5.7C34.6,6.1,29.6,4,24,4C16.3,4,9.7,8.3,6.3,14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.1,0,9.8-2,13.3-5.3l-6.1-5c-2.1,1.5-4.7,2.3-7.2,2.3c-5.2,0-9.6-3.1-11.2-7.5l-6.5,5C9.7,39.7,16.3,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.6,20.5H42V20H24v8h11.3c-1.1,3-3.3,5.5-6.1,7.1l6.1,5C39.5,36.3,44,30.7,44,24C44,22.7,43.8,21.6,43.6,20.5z"
              />
            </svg>
            <span className="ms-2">Sign in with Google</span>
          </button>
          {/* Extra */}
          <p className="text-center mt-3 small text-muted">
            Don't have an account?{" "}
            <span
              className="text-primary"
              onClick={() => {
                setAuthScreen("signup");
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
