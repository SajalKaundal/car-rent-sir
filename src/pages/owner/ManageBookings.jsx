import { useEffect, useState } from "react";
import { fetchAllBookings } from "../../services/bookingsServices";
import { auth } from "../../firebase/firebaseConfig";

function ManageBookings() {
  const user = auth.currentUser
  const API_URL = import.meta.env.VITE_API_URL;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const bookings = await fetchAllBookings(user);
        setBookings(bookings);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchBookingsData();
  }, [API_URL,user]);

  return (
    <div>
      <h5 className="fw-bold mb-3">Manage Bookings</h5>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Car</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No bookings available
                </td>
              </tr>
            ) : (
              bookings.map((b, index) => (
                <tr key={b._id}>
                  <td>{index + 1}</td>
                  <td>{b.userId}</td>
                  <td>{b.car.brand}</td>
                  <td>{new Date(b.pickupDate).toLocaleDateString()}</td>

                  <td>
                    <span
                      className={`badge ${
                        b.status === "confirmed"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td>
                    <button
                      disabled={
                        b.status === "confirmed" || b.status === "cancelled"
                      }
                      className="btn btn-sm btn-success me-2"
                    >
                      Approve
                    </button>
                    <button
                      disabled={b.status === "cancelled"}
                      className="btn btn-sm btn-danger"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageBookings;