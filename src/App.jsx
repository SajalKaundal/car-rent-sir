import { Route, Routes, useLocation } from "react-router";
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
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";

const App = () => {
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  return (
    <div
      style={{
        overflow: isLoggedIn && showSignUp ? "auto" : "hidden",
        height: isLoggedIn && showSignUp ? "auto" : "100vh",
      }}
    >
      {!isOwnerPath && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/list-your-car" element={<ListYourCar />} />
        <Route path="/owner/dashboard" element={<Dashboard />}>
          <Route index element={<AddCar />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="edit-car/:id" element={<EditCar />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {isLoggedIn || (
        <Login setIsLoggedIn={setIsLoggedIn} setShowSignUp={setShowSignUp} />
      )}
      {showSignUp || (
        <SignUp setShowSignUp={setShowSignUp} setIsLoggedIn={setIsLoggedIn} />
      )}
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
