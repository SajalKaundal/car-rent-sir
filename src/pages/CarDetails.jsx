import { useNavigate, useParams } from "react-router";
// import { dummyCarData } from "../assets/assests";
import { useEffect, useState } from "react";
import { cityList } from "../assets/assests";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import "./CarDetails.css";

const CarDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  // const car = dummyCarData.find((car) => car._id === id);
  const [car, setCar] = useState({
    _id: "",
    owner: "",
    brand: "",
    image: "",
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
  const [pickupLocation, setPickupLocation] = useState("");
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/?_id=${id}`);
        const data = await response.json();
        const car = data.cars[0];
        setCar(car);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCarDetails();
  }, [id,API_URL]);
  return (
    // <div className="row m-5">
    //   <div className="mb-2">
    //     <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
    //       Back
    //     </button>
    //   </div>
    //   <div className="col-lg-6">
    //     <div className="card">
    //       <img className="card-img-top" src={car.image} alt="Card image cap" />
    //       <div className="card-body">
    //         <h5 className="card-title">
    //           <FaIndianRupeeSign />
    //           {`${car.pricePerDay}/Day`}
    //         </h5>
    //       </div>
    //       <ul className="list-group list-group-flush">
    //         <li className="list-group-item">{`${car.brand}/${car.category} `}</li>
    //         <li className="list-group-item">{car.year}</li>
    //         <li className="list-group-item"><IoPerson />{` - ${car.seating_capacity}`}</li>
    //         <li className="list-group-item"><BsFillFuelPumpFill />{` - ${car.fuel_type}`}</li>
    //         <li className="list-group-item"><FaGear />{` - ${car.transmission}`}</li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="mt-lg-0 mt-sm-5 col-lg-6">
    //     <div>
    //       <label className="form-label">Pickup Location</label>
    //       <select
    //         className="form-select"
    //         value={pickupLocation}
    //         onChange={(e) => setPickupLocation(e.target.value)}
    //       >
    //         <option value="" disabled>
    //           Pickup Location
    //         </option>
    //         {cityList.map((city) => (
    //           <option key={city} value={city}>
    //             {city}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <div>
    //       <label className="form-label">PickUp Date</label>
    //       <input type="date" id="pickup-date" className="form-control" />
    //     </div>
    //     <div>
    //       <label className="form-label">Return Date</label>
    //       <input type="date" id="return-date" className="form-control" />
    //     </div>
    //     <div className="mt-2">
    //       <button className="btn btn-success form-check">Rent Now</button>
    //     </div>
    //   </div>
    // </div>
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
          <div className="card border-0 shadow p-4 booking-card">
            <h4 className="fw-bold mb-4">Book This Car</h4>

            <div className="mb-3">
              <label className="form-label fw-semibold">Pickup Location</label>
              <select
                className="form-select"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
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

            <div className="mb-3">
              <label className="form-label fw-semibold">Pickup Date</label>
              <input type="date" className="form-control" />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Return Date</label>
              <input type="date" className="form-control" />
            </div>

            <button className="btn btn-success w-100 py-2 fw-bold">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
