import { dummyUserData } from "../../assets/assests";
import { NavLink } from "react-router";
import { MdCarRental } from "react-icons/md";

function OwnerNavBar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
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
        </div>
      </nav>
    </div>
  );
}
export default OwnerNavBar