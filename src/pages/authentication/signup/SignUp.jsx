import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./SignUp.css";
import { auth, provider } from "../../../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { syncUser } from "../../../services/userServices";
import { useNavigate } from "react-router";



function SignUp({ setAuthScreen }) {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);
  const [signinError, setSigninError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setSigninError("Password do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        setAuthScreen("login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} : ${errorMessage}`);
        setSigninError(errorMessage);
        // ..
      });

    // console.log(form);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const data = await syncUser(user);
       if(data.user.role === "admin") {
        navigate("/owner/dashboard")
      }else{
        navigate("/")
      }
      setAuthScreen("");
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setSigninError(errorMessage);
      // ...
    }
  };

  const handleSendVerification = async () => {
    try {
      setLoading(true);
      setVerifyError("");
      setVerifyMessage("");

      const user = auth.currentUser;

      if (!user) {
        setVerifyError("Please sign up/login first");
        return;
      }

      await sendEmailVerification(user);

      setVerifyMessage("Verification email sent");
      setIsSent(true);
    } catch (err) {
      setVerifyError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signup-overlay">
      <div className="signup-popup shadow-lg">
        {/* Close Button */}
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={() => setAuthScreen("login")}
        ></button>

        <h3 className="text-center fw-bold mb-2">Create Account</h3>
        <span className="d-block text-danger" style={{ minHeight: "20px" }}>
          {signinError}
        </span>
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

            <div className="input-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
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
          <button className="btn btn-primary w-100 mt-2">Sign Up</button>
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

          {/* Redirect */}
          <p className="text-center mt-3 small">
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setAuthScreen("login");
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

export default SignUp;
