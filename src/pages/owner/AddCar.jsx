import { useState } from "react";

const AddCar = () => {
  const [carData, setCarData] = useState({
    brand: "",
    year: "",
    category: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
    pricePerDay: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setCarData({ ...carData, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(carData);
    alert("Car added successfully!");
  };

  return (
    <div className="container mt-5">
      
      <div className="card shadow-lg p-4 border-0 rounded-4">
        
        <h2 className="text-center mb-4 fw-bold">
           Sell Your Car
        </h2>

        <form onSubmit={handleSubmit} className="row g-4">

          {/* Brand */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Brand</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="e.g. Toyota"
              onChange={handleChange}
              required
            />
          </div>

          {/* Year */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Year</label>
            <input
              type="number"
              name="year"
              className="form-control"
              placeholder="2023"
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="SUV / Sedan"
              onChange={handleChange}
              required
            />
          </div>

          {/* Seating */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Seating Capacity</label>
            <input
              type="number"
              name="seating_capacity"
              className="form-control"
              placeholder="5"
              onChange={handleChange}
              required
            />
          </div>

          {/* Fuel */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Fuel Type</label>
            <select
              name="fuel_type"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="">Select Fuel</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
              <option>CNG</option>
            </select>
          </div>

          {/* Transmission */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Transmission</label>
            <select
              name="transmission"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option>Manual</option>
              <option>Automatic</option>
            </select>
          </div>

          {/* Price */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Price / Day (₹)</label>
            <input
              type="number"
              name="pricePerDay"
              className="form-control"
              placeholder="₹ 200"
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImage}
              accept="image/*"
              required
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="col-12 text-center">
              <img
                src={preview}
                alt="preview"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Description */}
          <div className="col-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Write something about your car..."
              rows="3"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Button */}
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-dark w-100 py-2 fw-semibold"
            >
              🚀 Add Car
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCar;