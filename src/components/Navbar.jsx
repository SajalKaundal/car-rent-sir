import { CiSearch } from "react-icons/ci";
import { MdCarRental } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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
            <span className="text-danger fs-4" >
              Rent
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/cars">
                Cars
              </NavLink>
              <NavLink className="nav-link" to="/my-bookings">
                My Bookings
              </NavLink>
              <div className="d-flex my-1 mx-1">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="form-control"
                />
                <span>
                  <CiSearch className="text-white fs-4 ms-2" />
                </span>
              </div>
              <div className="d-flex my-1 mx-1">
                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/owner/dashboard")}
                >
                  Dashboard
                </button>
              </div>
              <div className="d-flex my-1 mx-1">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
