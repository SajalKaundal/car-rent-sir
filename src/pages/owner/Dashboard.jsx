import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assests";
import OwnerNavBar from "../../components/owner/OwnerNavBar";
import { NavLink, Outlet } from "react-router-dom";
import Title from "../../components/owner/Title";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    setDashboardData(dummyDashboardData);
  }, []);

  const data = [
    { title: "Total Cars", subTitle: dashboardData.totalCars },
    { title: "Total Bookings", subTitle: dashboardData.totalBookings },
    { title: "Pending Bookings", subTitle: dashboardData.pendingBookings },
    { title: "Confirmed Bookings", subTitle: dashboardData.confirmedBookings },
    { title: "Monthly Revenue", subTitle: dashboardData.monthlyRevenue },
  ];

  return (
    <div className="bg-light min-vh-100">
      <OwnerNavBar />

      <div className="container mt-5">
        <div className="row g-4">
          
          {/* LEFT SIDE - STATS */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-4 p-3">
              <h5 className="mb-3 fw-bold">Dashboard Overview</h5>

              <ul className="list-group list-group-flush">
                {data.map((item, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 rounded-3 bg-light"
                    key={index}
                  >
                    <span className="text-muted">{item.title}</span>
                    <span className="fw-bold text-primary">
                      {item.subTitle || 0}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE - TABS + CONTENT */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 p-3">
              
              {/* NAV TABS */}
              <ul className="nav nav-pills mb-3 gap-2">
                <li className="nav-item">
                  <NavLink
                    to=""
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active rounded-pill px-4"
                        : "nav-link text-dark rounded-pill px-4"
                    }
                  >
                    Add Cars
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="manage-bookings"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active rounded-pill px-4"
                        : "nav-link text-dark rounded-pill px-4"
                    }
                  >
                    Bookings
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="manage-cars"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active rounded-pill px-4"
                        : "nav-link text-dark rounded-pill px-4"
                    }
                  >
                    Cars
                  </NavLink>
                </li>
              </ul>

              {/* CONTENT AREA */}
              <div className="p-3 bg-light rounded-4 min-vh-25">
                <Outlet />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;