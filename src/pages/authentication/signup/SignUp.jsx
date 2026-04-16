import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./SignUp.css";

function Signup({ setAuthScreen }) {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(form);
  };

  return (
    <div className="signup-overlay">
      <div className="signup-popup shadow-lg">
        {/* Close Button */}
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={() => setAuthScreen("login")}
        ></button>

        <h3 className="text-center fw-bold mb-4">Create Account</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "password" : "text"}
              name="password"
              className="form-control pe-5"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Confirm Password</label>
            <input
              type={showConfirm ? "password" : "text"}
              name="confirmPassword"
              className="form-control pe-5"
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Button */}
          <button
            className="btn btn-primary w-100 mt-2"
            onClick={() => {
             setAuthScreen("login")
            }}
          >
            Sign Up
          </button>

          {/* Redirect */}
          <p className="text-center mt-3 small">
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => {
               setAuthScreen("login")
              }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;