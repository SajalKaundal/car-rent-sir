import { useState } from "react";
import "./ResetPassword.css";

export default function ResetPassword({ setAuthScreen }) {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("New Password:", form.password);

    // TODO: call backend API here

    setAuthScreen("login");
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        {/* Close Button */}
         <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={() => setAuthScreen("login")}
        ></button>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <h3 className="auth-title">Reset Password</h3>

          {/* Subtitle */}
          <p className="auth-subtitle">Enter your new password below</p>

          {/* Password */}
          <div className="form-group mt-3 text-start">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group mt-3 text-start">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mt-4"
            onClick={() => setAuthScreen("login")}
          >
            Reset Password
          </button>

          {/* Back */}
          <p className="switch-text mt-3">
            Back to <span onClick={() => setAuthScreen("login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
