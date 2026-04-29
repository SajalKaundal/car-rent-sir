import { useNavigate, useParams } from "react-router";
// import { dummyCarData } from "../assets/assests";
import { useEffect, useState } from "react";
import { cityList } from "../assets/assests";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import "./CarDetails.css";
import { fetchCar } from "../services/carServices";
import { addBooking } from "../services/bookingsServices";
import { auth } from "../firebase/firebaseConfig";

const CarDetails = () => {
  const user = auth.currentUser
  const navigate = useNavigate();
  const { id } = useParams();

  // const car = dummyCarData.find((car) => car._id === id);
  const [car, setCar] = useState({
    _id: "",
    owner: "",
    brand: "",
    image: null,
    year: 0,
    category: "",
    seating_capacity: 0,
    fuel_type: "",
    transmission: "",
    pricePerDay: 0,
    description: "",
    isAvailable: null,
    createdAt: "",
    feature: null,
  });

  const [bookingData, setBookingData] = useState({
    userId: "70user001",
    pickupLocation: "",
    pickupDate: "",
    returnDate: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await addBooking({
        carId: car._id,
        ...bookingData,
      });

      console.log("Booking success:", result);
      alert("Booking created successfully");
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const car = await fetchCar(user,id);
        setCar(car);
        // console.log(car)
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCarDetails();
  }, [id,user]);

  return (
    <div className="container my-5">
      {/* Back Button */}
      <button
        className="btn btn-outline-dark mb-4 px-4"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="row g-4">
        {/* LEFT SIDE - CAR DETAILS */}
        <div className="col-lg-6">
          <div className="card border-0 shadow car-detail-card">
            <div className="position-relative">
              <img
                className="card-img-top"
                src={car.image}
                alt={car.brand}
                style={{ height: "300px", objectFit: "cover" }}
              />

              {car.isAvailable && (
                <span className="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-2">
                  Available
                </span>
              )}
            </div>

            <div className="card-body">
              <h4 className="fw-bold">{car.brand}</h4>
              <p className="text-muted mb-2">{car.category}</p>

              <h5 className="text-primary fw-bold">
                <FaIndianRupeeSign /> {car.pricePerDay} / day
              </h5>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Year</span>
                <span className="fw-bold">{car.year}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <IoPerson /> Seats
                </span>
                <span className="fw-bold">{car.seating_capacity}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <BsFillFuelPumpFill /> Fuel
                </span>
                <span className="fw-bold">{car.fuel_type}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <FaGear /> Transmission
                </span>
                <span className="fw-bold">{car.transmission}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE - BOOKING FORM */}
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="card border-0 shadow p-4 booking-card">
              <h4 className="fw-bold mb-4">Book This Car</h4>

              {/* Pickup Location */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Pickup Location
                </label>
                <select
                  className="form-select"
                  name="pickupLocation"
                  value={bookingData.pickupLocation}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  {cityList.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Date */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Pickup Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="pickupDate"
                  value={bookingData.pickupDate}
                  onChange={handleChange}
                />
              </div>

              {/* Return Date */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Return Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="returnDate"
                  value={bookingData.returnDate}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-success w-100 py-2 fw-bold"
              >
                Rent Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
