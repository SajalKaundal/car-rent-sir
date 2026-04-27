import { useEffect, useState } from "react";
import { dummyMyBooking } from "../../assets/assests";
function ManageBookings() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/bookings/`);
        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBookings();
    // setBookings(
    //   dummyMyBooking
    // );
  }, [API_URL]);
  // console.log(dummyMyBooking);
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
            {bookings.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.user}</td>
                <td>{b.car.owner}</td>
                <td>{b.pickupDate}</td>

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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageBookings;
