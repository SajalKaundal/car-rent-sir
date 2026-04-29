import { useEffect, useState } from "react";
// import { dummyCarData } from "../assets/assests";
import CarCard from "../components/CarCard";
import Title from "../components/Title";
// import { useMemo } from "react";
import useDebounce from "../utils/useDebounce";
import Pagination from "../components/Pagination";
import { fetchCars, fetchSearchCar } from "../services/carServices";
import { auth } from "../firebase/firebaseConfig";
const Cars = () => {
  const user = auth.currentUser
  const [searchCar, setSearchCar] = useState("");
  const carsLoaded =9
  const debounceSearch = useDebounce(searchCar, 700);
  const [data, setData] = useState({
    cars: [],
    total: 0,
    page: 0,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const controller = new AbortController();
    const getCars = async () => {
      try {
        let result;
        if (debounceSearch) {
          result = await fetchSearchCar(user,{
            page,
            limit: carsLoaded,
            search: debounceSearch,
            signal: controller.signal,
          });
        } else {
          result = await fetchCars(user,{
            page,
            limit: carsLoaded,
          });
        }
        setData(result);
      } catch (err) {
        console.error(err.message);
      }
    };
    getCars();

    return () => controller.abort();
  }, [debounceSearch, carsLoaded, page,user]);
  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);
  // const filteredCars = useMemo(() => {
  //   const query = debounceSearch.toLowerCase();

  //   return dummyCarData.filter((car) => {
  //     return (
  //       car.brand.toLowerCase().includes(query) ||
  //       car.category.toLowerCase().includes(query) ||
  //       car.fuel_type.toLowerCase().includes(query)
  //     );
  //   });
  // }, [debounceSearch]);

  const pages = [];
  for (let i = 1; i <= data.totalPages; i++) {
    pages.push(
      <li className={`page-item ${i === page && "active"}`} key={i}>
        <a className="page-link" onClick={() => setPage(i)}>
          {i}
        </a>
      </li>,
    );
  }

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
        {data.cars.length > 0 ? (
          data.cars.map((car) => (
            <div key={car._id} className="col-lg-4">
              <CarCard car={car} />
            </div>
          ))
        ) : (
          <p className="text-center">No cars found</p>
        )}
      </div>
      {/* <div
        className={
          carsLoaded >= cars.length
            ? "d-none"
            : "d-flex justify-content-center mt-5"
        }
      >
        <button
          className="btn btn-primary"
          onClick={() => setCarsLoaded((prev) => prev + 6)}
        >
          Load More
        </button>
      </div> */}
      {data.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          pages={pages}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
};

export default Cars;
