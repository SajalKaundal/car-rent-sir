import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from "react-router";
import "./CarCard.css";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  return (
    // <div className="card" onClick={() => navigate(`/car-details/${car._id}`)}>
    //   <img
    //     src={car.image}
    //     className="card-img-top car-card-image"
    //     alt="..."
    //     loading="lazy"
    //     style={{height:'230px'}}
    //   />
    //   <div className="card-body">
    //     <h5 className="card-title">{car.brand}</h5>
    //     {car.isAvailable && (
    //       <p className="card-text bg-primary text-white text-center">
    //         Available Now
    //       </p>
    //     )}
    //   </div>
    //   <ul className="list-group list-group-flush">
    //     <li className="list-group-item">
    //       <FaIndianRupeeSign />
    //       {car.pricePerDay} <span> / day</span>
    //     </li>
    //     <li className="list-group-item">
    //       {car.brand} / {car.category}
    //     </li>
    //     <li className="list-group-item">
    //       <IoMdPerson /> -{" "}
    //       <span className="fw-bold">{car.seating_capacity}</span>
    //     </li>
    //     <li className="list-group-item">
    //       Fuel: <span className="fw-bold">{car.fuel_type}</span>
    //     </li>
    //     <li className="list-group-item">
    //       Transmission: <span className="fw-bold">{car.transmission}</span>
    //     </li>
    //   </ul>
    // </div>
    <div
      className="card car-card shadow-sm border-0"
      onClick={() => navigate(`/car-details/${car._id}`)}
      style={{ cursor: "pointer", borderRadius: "15px", overflow: "hidden" }}
    >
      <div className="position-relative">
        <img
          src={car.image}
          className="card-img-top"
          alt={car.brand}
          loading="lazy"
          style={{ height: "200px", objectFit: "cover" }}
        />

        {car.isAvailable && (
          <span className="badge bg-success position-absolute top-0 end-0 m-2 px-3 py-2">
            Available
          </span>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title fw-bold mb-2">{car.brand}</h5>

        <p className="text-muted mb-2">{car.category}</p>

        <h6 className="fw-bold text-primary mb-3">
          <FaIndianRupeeSign /> {car.pricePerDay} / day
        </h6>

        <div className="d-flex justify-content-between text-muted small">
          <span>
            <IoMdPerson /> {car.seating_capacity}
          </span>
          <span>{car.fuel_type}</span>
          <span>{car.transmission}</span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
