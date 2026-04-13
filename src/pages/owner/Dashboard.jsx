import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assests";
import OwnerNavBar from "../../components/owner/OwnerNavBar";
import { NavLink, Outlet } from "react-router-dom";

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
  const bookings = dashboardData.recentBookings || [];

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

            <div className="mt-3 card border-0 shadow-sm rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Recent Bookings</h6>
                <span className="text-primary small">View All</span>
              </div>

              {bookings.length === 0 ? (
                <p className="text-muted small mb-0">
                  No recent bookings found.
                </p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {bookings.map((b, index) => (
                    <div key={index} className="d-flex align-items-start">
                      {/* Timeline dot */}
                      <div className="d-flex flex-column align-items-center me-3">
                        <div
                          className={`rounded-circle ${
                            b.status === "confirmed"
                              ? "bg-success"
                              : b.status === "pending"
                                ? "bg-warning"
                                : "bg-danger"
                          }`}
                          style={{ width: "12px", height: "12px" }}
                        ></div>

                        {/* vertical line */}
                        {index !== bookings.length - 1 && (
                          <div
                            className="bg-secondary"
                            style={{
                              width: "2px",
                              height: "40px",
                              opacity: 0.3,
                            }}
                          ></div>
                        )}
                      </div>

                      {/* Content card */}
                      <div className="flex-grow-1 bg-light rounded-4 p-3 shadow-sm">
                        <div className="d-flex justify-content-between">
                          {/* Left */}
                          <div>
                            <div className="fw-semibold">{b.car.brand}</div>
                            <div className="text-muted small">
                              {b.pickupDate} → {b.returnDate}
                            </div>
                            <div className="text-muted small">
                              User: {b.user}
                            </div>
                          </div>

                          {/* Right */}
                          <div className="text-end">
                            <div className="fw-bold">₹{b.price}</div>
                            <span
                              className={`badge ${
                                b.status === "confirmed"
                                  ? "bg-success-subtle text-success"
                                  : b.status === "pending"
                                    ? "bg-warning-subtle text-warning"
                                    : "bg-danger-subtle text-danger"
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
