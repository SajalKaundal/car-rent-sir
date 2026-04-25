import { useEffect, useState } from "react";
export default function Booking({ booking, index }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [car, setCar] = useState({
    _id: "",
    owner: "",
    brand: "",
    image: "",
    year: "",
    category: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
    pricePerDay: "",
    description: "",
    isAvailable: null,
    createdAt: null,
    featured: null,
  });
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`${API_URL}/?_id=${booking.car}`);
        const car = await response.json();
        setCar(car.cars[0]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCar();
    // console.log(car);
  }, [API_URL, booking.car]);
  return (
    <div className="row">
      <div className="col-lg-4 col-md-10 col-12 mb-4">
        <div className="card shadow-sm h-100 align-middle justify-content-center">
          {/* Car Image */}
          <img
            src={car.image}
            className="card-img-top"
            alt={car.name}
            // style={{ height: "200px", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="col-12 col-md-10 col-lg-8 mb-4">
        <div className="card shadow-sm h-100 p-3">
          <h5 className="fw-bold mb-3">{`# ${index}`}</h5>

          {/* Car Name */}
          <h5 className="fw-bold mb-3">{car.name}</h5>

          {/* Car Details */}
          <div className="row text-muted mb-3">
            <div className="col-6 col-md-3 mb-2">
              <small>Brand</small>
              <div className="fw-semibold">{car.brand}</div>
            </div>

            <div className="col-6 col-md-3 mb-2">
              <small>Category</small>
              <div className="fw-semibold">{car.category}</div>
            </div>

            <div className="col-6 col-md-3 mb-2">
              <small>Seats</small>
              <div className="fw-semibold">{car.seating_capacity}</div>
            </div>

            <div className="col-6 col-md-3 mb-2">
              <small>Transmission</small>
              <div className="fw-semibold">{car.transmission}</div>
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
              <div className="fw-semibold text-primary">₹{booking.price}</div>
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
  );
}
