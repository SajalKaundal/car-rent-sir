import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/firebaseConfig";

import CarDetails from "./pages/CarDetails";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import AddCar from "./pages/owner/AddCar";
import Dashboard from "./pages/owner/Dashboard";
import ManageBookings from "./pages/owner/ManageBookings";
import ManageCars from "./pages/owner/ManageCars";
import NotFound from "./pages/NotFound";
import EditCar from "./pages/owner/EditCar";
import ListYourCar from "./pages/ListYourCar";
import AuthScreen from "./pages/authentication/AuthScreen";
import UserLayout from "./pages/layout/UserLayout";
import AdminLayout from "./pages/layout/AdminLayout";

const App = () => {
  // const isOwnerPath = useLocation().pathname.startsWith("/owner");

  const [authScreen, setAuthScreen] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthScreen("login");
      }
      // } else if (!user.emailVerified) {
      //   setAuthScreen("verify");
      // }
      else {
        setAuthScreen("");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div
          style={{
            overflow: !authScreen ? "auto" : "hidden",
            height: !authScreen ? "auto" : "100vh",
          }}
        >
          {/* {!isOwnerPath && <Navbar setAuthScreen={setAuthScreen} />} */}

          <Routes>

            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/car-details/:id" element={<CarDetails />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/list-your-car" element={<ListYourCar />} />
            </Route>


            <Route element={<AdminLayout />}>
              <Route path="/owner/dashboard" element={<Dashboard />}>
                <Route index element={<AddCar />} />
                <Route path="manage-bookings" element={<ManageBookings />} />
                <Route path="manage-cars" element={<ManageCars />} />
                <Route path="edit-car/:id" element={<EditCar />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>

          {authScreen && (
            <AuthScreen authScreen={authScreen} setAuthScreen={setAuthScreen} />
          )}

          {/* {!isOwnerPath && <Footer />} */}
        </div>
      )}
    </>
  );
};

export default App;
