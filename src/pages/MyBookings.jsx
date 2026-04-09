import { dummyMyBooking } from "../assets/assests";
import Title from "../components/Title";
const MyBookings = () => {
  let count = 1;
  return (
    <div className="container mt-4">
      <Title
        title="My Bookings"
        subTitle="View and manage your all car bookings"
      />
      <div className="row">
        {dummyMyBooking.map((booking) => (
          <div className="row" key={booking._id}>
            <div className="col-lg-4 col-md-10 col-12 mb-4" >
              <div className="card shadow-sm h-100 align-middle justify-content-center">
                {/* Car Image */}
                <img
                  src={booking.car.image}
                  className="card-img-top"
                  alt={booking.car.name}
                  // style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-12 col-md-10 col-lg-8 mb-4">
              <div className="card shadow-sm h-100 p-3">
                <h5 className="fw-bold mb-3">{`# ${count++}`}</h5>

                {/* Car Name */}
                <h5 className="fw-bold mb-3">{booking.car.name}</h5>

                {/* Car Details */}
                <div className="row text-muted mb-3">
                  <div className="col-6 col-md-3 mb-2">
                    <small>Brand</small>
                    <div className="fw-semibold">{booking.car.brand}</div>
                  </div>

                  <div className="col-6 col-md-3 mb-2">
                    <small>Category</small>
                    <div className="fw-semibold">{booking.car.category}</div>
                  </div>

                  <div className="col-6 col-md-3 mb-2">
                    <small>Seats</small>
                    <div className="fw-semibold">
                      {booking.car.seating_capacity}
                    </div>
                  </div>

                  <div className="col-6 col-md-3 mb-2">
                    <small>Transmission</small>
                    <div className="fw-semibold">
                      {booking.car.transmission}
                    </div>
                  </div>
                </div>

                <hr />

                {/* Booking Details */}
                <div className="row">
                  <div className="col-6 col-md-3 mb-2">
                    <small className="text-muted">Pickup</small>
                    <div className="fw-semibold">{booking.pickupDate}</div>
                  </div>

                  <div className="col-6 col-md-3 mb-2">
                    <small className="text-muted">Return</small>
                    <div className="fw-semibold">{booking.returnDate}</div>
                  </div>

                  <div className="col-6 col-md-3 mb-2">
                    <small className="text-muted">Price</small>
                    <div className="fw-semibold text-primary">
                      ₹{booking.price}
                    </div>
                  </div>

                  <div className="col-6 col-md-3 mb-2">
                    <small className="text-muted">Status</small>
                    <div
                      className={`fw-semibold ${
                        booking.status === "confirmed"
                          ? "text-success"
                          : booking.status === "pending"
                            ? "text-warning"
                            : "text-danger"
                      }`}
                    >
                      {booking.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
