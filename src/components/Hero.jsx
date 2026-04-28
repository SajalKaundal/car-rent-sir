import { useState } from "react";
import { cityList } from "../assets/assests";
// import hero from "../assets/Car_Images/background_image.webp";
const Hero = () => {
  const [pickupLocation, setpickupLocation] = useState("");
  return (
    <div className="hero-container">
      <img
        src="https://res.cloudinary.com/dhbpysn7d/image/upload/f_auto,q_50,w_1200,h_600,c_fill/v1775719488/background_image_b0bbnh.webp"
        alt="Luxury Cars"
        className="hero-img"
        loading="lazy"
      />
      <div className="hero">
        <div className="hero-text">
          <p>Luxury Is Here</p>
        </div>
        <div className="row container mt-2">
          <div className="col-lg-3">
            <select
              className="form-select"
              value={pickupLocation}
              onChange={(e) => setpickupLocation(e.target.value)}
            >
              <option value="" disabled>
                Pickup Location
              </option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="text-white mt-2 text-center">
              {pickupLocation ? pickupLocation : "Please Select PickUP"}
            </p>
          </div>
          <div className="col-lg-3">
            <input type="date" id="pickup-date" className="form-control" />
            <p className="text-white mt-2 text-center">PickUp Date</p>
          </div>
          <div className="col-lg-3">
            <input type="date" id="return-date" className="form-control" />
            <p className="text-white mt-2 text-center">Return Date</p>
          </div>
          <div className="col-lg-3">
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
