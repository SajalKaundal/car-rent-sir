import { dummyUserData } from "../../assets/assests";
import { NavLink } from "react-router";
import { MdCarRental } from "react-icons/md";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";


function OwnerNavBar() {
  const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log("User logged out");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" >
            <MdCarRental />
            Car
            <span className="text-danger fs-4">Rent</span>
          </NavLink>
          <div className="d-flex w-100 justify-content-end">
            <img
              className="profile-img"
              src={dummyUserData.image}
              alt="user_profile_image"
            />
          </div>
          <div className="text-light">Welcome, {dummyUserData.name}</div>
           <button
                    className="btn btn-dark"
                    // onClick={() => navigate("/")}
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
        </div>
      </nav>
    </div>
  );
}
export default OwnerNavBar