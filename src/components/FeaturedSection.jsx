import Title from "./Title";
// import { dummyCarData } from "../assets/assests";
import CarCard from "./CarCard";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchCars } from "../services/carServices";
import { auth } from "../firebase/firebaseConfig";
// import { useState } from "react";
const FeaturedSection = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  // const [visibleCars, setVisibleCars] = useState(3);
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchCars(user, {
          limit: 3,
          featured: true,
        });
        setFeaturedCars(data.cars);
      } catch (err) {
        console.error(err.message);
      }
    };
    getCars();
  }, []);
  return (
    <div className="container mt-5">
      <div>
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure"
        />
      </div>

      <div className="row gy-3">
        {featuredCars.map((car) => (
          <div key={car._id} className="col-lg-4">
            <CarCard car={car} />
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <button
            className="btn btn-primary me-md-2"
            onClick={() => {
              // setVisibleCars(visibleCars+3)
              navigate("/cars");
            }}
          >
            Explore all Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
