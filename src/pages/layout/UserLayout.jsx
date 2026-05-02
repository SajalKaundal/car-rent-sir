import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router";
import { auth } from "../../firebase/firebaseConfig";
import { syncUser } from "../../services/userServices";
import { useEffect, useState } from "react";
import Unauthorized from "../../components/Unauthorized";

function UserLayout() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = auth.currentUser;
    const checkUser = async () => {
      const data = await syncUser(user);
      setUser(data.user);
    };
    checkUser();
  }, []);
  if (user.role === "user") {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  } else if (user.role === "admin") {
    return (
      <>
        <Unauthorized />
      </>
    );
  } else {
    return <></>;
  }
}

export default UserLayout;
