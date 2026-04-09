import { useState } from "react";
import { dummyCarData } from "../assets/assests";
import CarCard from "../components/CarCard";
import Title from "../components/Title";
import { useMemo } from "react";
import useDebounce from "../utils/useDebounce";

const Cars = () => {
  const [searchCar, setSearchCar] = useState("");
  const [carsLoaded, setCarsLoaded] = useState(9);
  const debounceSearch = useDebounce(searchCar, 700);
  const filteredCars = useMemo(() => {
    const query = debounceSearch.toLowerCase();

    return dummyCarData.filter((car) => {
      return (
        car.brand.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query) ||
        car.fuel_type.toLowerCase().includes(query)
      );
    });
  }, [debounceSearch]);
  return (
    <div className=" mt-5 container">
      <Title
        title="Available"
        subTitle="Browse our selection of premium vehicle available for your next adventure"
      ></Title>
      <br />
      <div className="mt-3">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by make or features"
              onChange={(e) => setSearchCar(e.target.value)}
              value={searchCar}
            />
          </div>

          <div className="my-3 d-flex justify-content-center">
            <button className="btn btn-dark">Search</button>
          </div>
        </form>
      </div>
      <div className="row gy-3">
        {filteredCars.length > 0 ? (
          filteredCars.slice(0, carsLoaded).map((car) => (
            <div key={car._id} className="col-lg-4">
              <CarCard car={car} />
            </div>
          ))
        ) : (
          <p className="text-center">No cars found 😢</p>
        )}
      </div>
      <div
        className={
          carsLoaded >= filteredCars.length
            ? "d-none"
            : "d-flex justify-content-center mt-5"
        }
      >
        <button
          className="btn btn-primary {carsLoaded}"
          onClick={() => setCarsLoaded((prev) => prev + 6)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Cars;
