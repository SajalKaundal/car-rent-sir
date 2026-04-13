import { useEffect, useState } from "react";
import { dummyMyBooking } from "../../assets/assests";
function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(
      dummyMyBooking
    );
  }, []);
  console.log(dummyMyBooking)
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
                  <button className="btn btn-sm btn-success me-2">
                    Approve
                  </button>
                  <button className="btn btn-sm btn-danger">
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