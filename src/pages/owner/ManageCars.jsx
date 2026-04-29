import { useEffect, useState } from "react";
// import { dummyCarData } from "../../assets/assests";
import { useNavigate } from "react-router";
import { fetchCars, deleteCar } from "../../services/carServices";
import { auth } from "../../firebase/firebaseConfig";

function ManageCars() {
  const user = auth.currentUser
  const [cars, setCars] = useState([]);
  const [carNumber, setCarNumber] = useState(100);
  const navigate = useNavigate();

  const onDelete = async (id) => {
    try {
      const result = await deleteCar(user,id);
      if (!result.success) {
        throw new Error(result.message)
      }
      alert("Car deleted Successfully")
      setCars((prev)=> prev.filter((car)=> car._id !==  id))
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchCars(user,{
          limit: 100,
        });
        setCars(data.cars);
      } catch (err) {
        console.log(err.message);
      }
    };
    getCars();
  }, [user]);

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Manage Cars</h5>

        {/* <button className="btn btn-dark rounded-pill px-4">
          + Add New Car
        </button> */}
      </div>

      {/* CAR GRID */}
      <div className="row g-4">
        {cars.slice(0, carNumber).map((car) => (
          <div className="col-md-6 col-lg-6" key={car._id}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
              {/* IMAGE */}
              <img
                src={car.image}
                alt={car.brand}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
                loading="lazy"
              />

              {/* BODY */}
              <div className="card-body">
                {/* TITLE + STATUS */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">{car.brand}</h6>

                  <span
                    className={`badge ${
                      car.isAvailable ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Booked"}
                  </span>
                </div>

                {/* DETAILS */}
                <p className="text-muted small mb-2">
                  {car.category} • {car.fuel_type} • {car.transmission}
                </p>

                <p className="fw-semibold mb-3">₹ {car.pricePerDay} / day</p>

                {/* ACTION BUTTONS */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary w-100 rounded-pill"
                    onClick={() => {
                      navigate(`/owner/dashboard/edit-car/${car._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger w-100 rounded-pill"
                    onClick={() => onDelete(car._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW MORE BUTTON */}
      {carNumber < cars.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-dark rounded-pill px-4"
            onClick={() => setCarNumber((prev) => prev + 4)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageCars;
