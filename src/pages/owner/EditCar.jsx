import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { dummyCarData } from "../../assets/assests";
import { fetchCar, updateCar } from "../../services/carServices";
import { auth } from "../../firebase/firebaseConfig";

function EditCar() {

  const user = auth.currentUser
  const { id } = useParams();
  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);
  const [originalCar, setOriginalCar] = useState({
    brand: "",
    year: "",
    category: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
    pricePerDay: "",
    description: "",
    image: null,
    isAvailable: true,
  });
  const [carData, setCarData] = useState({
    brand: "",
    year: "",
    category: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
    pricePerDay: "",
    description: "",
    image: "",
    isAvailable: true,
  });
  const [preview, setPreview] = useState("");
  //  Load existing car data
  useEffect(() => {
    const getCar = async () => {
      try {
        const car = await fetchCar(user, id);
        setCarData(car);
        setOriginalCar(car);
      } catch (err) {
        console.error(err);
      }
    };
    getCar();
  }, [id]);

  const checkUpdate = () => {
    const updateData = {};

    Object.keys(carData).forEach((key) => {
      //image case
      if (key === "image") {
        if (carData.image instanceof File) {
          updateData.image = carData.image;
        }
      }
      //normal fields
      else if (carData[key] !== originalCar[key]) {
        updateData[key] = carData[key];
      }
    });

    return updateData;
  };

  //  Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCarData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Updated Car:", carData);
    try {
      const updatedCar = checkUpdate();
      const result = await updateCar(user,id, updatedCar);
      if (!result.success) {
        throw new Error(result.message);
      }
      alert("Car Updated Successfully!");
      setCarData(result.data);
    } catch (err) {
      console.error(err);
    }
    // navigate("/dashboard/manage-cars");
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-outline-dark"
        onClick={() => navigate("/owner/dashboard/manage-cars")}
      >
        Back
      </button>
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <h5 className="fw-bold mb-4">Edit Car</h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* BRAND */}
            <div className="col-md-6">
              <label className="form-label">Brand</label>
              <input
                type="text"
                name="brand"
                value={carData.brand}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* YEAR */}
            <div className="col-md-6">
              <label className="form-label">Year</label>
              <input
                type="number"
                name="year"
                value={carData.year}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* CATEGORY */}
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={carData.category}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* PRICE */}
            <div className="col-md-6">
              <label className="form-label">Price Per Day</label>
              <input
                type="number"
                name="pricePerDay"
                value={carData.pricePerDay}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* FUEL */}
            <div className="col-md-6">
              <label className="form-label">Fuel Type</label>
              <input
                type="text"
                name="fuel_type"
                value={carData.fuel_type}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* TRANSMISSION */}
            <div className="col-md-6">
              <label className="form-label">Transmission</label>
              <input
                type="text"
                name="transmission"
                value={carData.transmission}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* SEATING */}
            <div className="col-md-6">
              <label className="form-label">Seating Capacity</label>
              <input
                type="number"
                name="seating_capacity"
                value={carData.seating_capacity}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* IMAGE */}
            <div className="col-md-6">
              <label className="form-label">Car Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>

            {/* IMAGE PREVIEW */}
            {carData.image && (
              <div className="col-12">
                <img
                  src={
                    preview ||
                    (typeof carData.image === "string" ? carData.image : "")
                  }
                  alt="preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={carData.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>

            {/* AVAILABILITY */}
            <div className="col-12 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={carData.isAvailable}
                onChange={(e) =>
                  setCarData((prev) => ({
                    ...prev,
                    isAvailable: e.target.checked,
                  }))
                }
              />
              <label className="form-check-label">Available for booking</label>
            </div>

            {/* PREVIEW BUTTON */}
            <div className="col-12">
              <button
                type="button"
                className="btn btn-outline-dark w-100 rounded-pill mb-2"
                onClick={() => setShowPreview(true)}
              >
                Preview Car
              </button>
            </div>

            {/* SUBMIT */}
            <div className="col-12">
              <button className="btn btn-dark w-100 rounded-pill">
                Update Car
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div
            className="bg-white rounded-4 p-4 shadow-lg"
            style={{ width: "400px" }}
          >
            <img
              src={
                preview ||
                (typeof carData.image === "string" ? carData.image : "")
              }
              alt="car"
              className="img-fluid rounded mb-3"
              style={{ height: "180px", objectFit: "cover", width: "100%" }}
            />

            <h5 className="fw-bold">{carData.brand}</h5>

            <p className="text-muted small mb-2">
              {carData.category} • {carData.fuel_type} • {carData.transmission}
            </p>

            <p className="fw-semibold">₹ {carData.pricePerDay} / day</p>

            <p className="small text-muted">{carData.description}</p>

            <span
              className={`badge ${
                carData.isAvailable ? "bg-success" : "bg-danger"
              }`}
            >
              {carData.isAvailable ? "Available" : "Booked"}
            </span>

            <div className="mt-3 text-end">
              <button
                className="btn btn-dark rounded-pill px-4"
                onClick={() => setShowPreview(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCar;
