const API_URL = import.meta.env.VITE_API_URL;

//fetch Car when searching
const fetchSearchCar = async ({ page = 1, limit = 9, search = "", signal }) => {
  try {
    const response = await fetch(
      `${API_URL}/?page=${page}&limit=${limit}&search=${search}`,
      { signal },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

const fetchCars = async ({ page = 1, limit = 3,featured=false }) => {
  try {
    const response = await fetch(
      `${API_URL}/?page=${page}&limit=${limit}&featured=${featured}`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

const fetchCar = async ({ _id = null }) => {
  if (!_id) {
    console.log("_id is required");
    return "";
  }
  try {
    const response = await fetch(`${API_URL}/?_id=${_id}`);
    const data = await response.json();
    return data.cars[0];
  } catch (err) {
    console.error(err.message);
  }
};

export { fetchSearchCar, fetchCars, fetchCar };
