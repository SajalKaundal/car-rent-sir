import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./Login.css";
export default function Login({ setIsLoggedIn, setShowSignUp }) {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="login-overlay">
      <div className="login-card shadow-lg">
        <h4 className="text-center mb-4 fw-bold">Login</h4>

        <form>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "password" : "text"}
              className="form-control pe-5"
              placeholder="Enter password"
            />

            {/* Eye icon */}
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Button */}
          <button
            className="btn btn-primary w-100 mt-2"
            onClick={() => {
              setIsLoggedIn((prev) => !prev);
            }}
          >
            Login
          </button>

          {/* Extra */}
          <p className="text-center mt-3 small text-muted">
            Don't have an account?{" "}
            <span
              className="text-primary"
              onClick={() => {
                setIsLoggedIn((prev) => !prev);
                setShowSignUp((prev) => !prev);
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
