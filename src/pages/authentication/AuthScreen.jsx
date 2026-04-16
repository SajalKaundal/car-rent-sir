import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import ForgotPassword from "./login/forgotpassword/ForgotPassword";
import OtpVerification from "./login/forgotpassword/OtpVerification";
import ResetPassword from "./login/forgotpassword/ResetPassword";

export default function AuthScreen({ authScreen, setAuthScreen }) {
  return (
    <>
      {authScreen === "login" && (
        <Login setAuthScreen={setAuthScreen} />
        )}
      {authScreen === "signup" && (
        <SignUp setAuthScreen={setAuthScreen} />
        )}
      {authScreen === "forgotPassword" && (
        <ForgotPassword setAuthScreen={setAuthScreen} />
      )}
      {authScreen === "otpVerification" && (
        <OtpVerification setAuthScreen={setAuthScreen} />
      )}
      {authScreen === "resetPassword" && (
        <ResetPassword setAuthScreen={setAuthScreen} />
      )}
    </>
  );
}
