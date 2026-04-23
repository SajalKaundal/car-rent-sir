import { useEffect, useState } from "react";
// import { dummyCarData } from "../assets/assests";
import CarCard from "../components/CarCard";
import Title from "../components/Title";
// import { useMemo } from "react";
import useDebounce from "../utils/useDebounce";

const Cars = () => {
  const [searchCar, setSearchCar] = useState("");
  const [carsLoaded, setCarsLoaded] = useState(9);
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
    const fetchSearchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/?page=${page}&limit=${carsLoaded}&search=${debounceSearch}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    const fetchdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/?page=${page}&limit=${carsLoaded}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (debounceSearch) {
      setPage(1);
      fetchSearchData();
    } else {
      fetchdata();
    }
    return () => controller.abort();
  }, [debounceSearch, carsLoaded, page]);
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
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center mt-5">
            <li
              className={`page-item ${page === 1 && "disabled"}`}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <a className="page-link" href="#" tabIndex="-1">
                Previous
              </a>
            </li>
            {pages.map((p) => p)}

            <li
              className={`page-item ${page === data.totalPages && "disabled"}`}
            >
              <a
                className="page-link"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Cars;
