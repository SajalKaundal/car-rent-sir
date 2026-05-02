import OwnerNavBar from "../../components/owner/OwnerNavBar";
import Unauthorized from "../../components/Unauthorized";
import { auth } from "../../firebase/firebaseConfig";
import { syncUser } from "../../services/userServices";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
function AdminLayout() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = auth.currentUser;
    const checkUser = async () => {
      const data = await syncUser(user);
      setUser(data.user);
    };
    checkUser();
  }, []);
  if (user.role === "admin") {
    return (
      <>
        <OwnerNavBar />
        <Outlet />
      </>
    );
  } else if (user.role === "user") {
    return (
      <>
        <Unauthorized />
      </>
    );
  } else {
    return <></>;
  }
}

export default AdminLayout;
