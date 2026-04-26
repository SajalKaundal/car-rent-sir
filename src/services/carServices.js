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

const fetchCars = async ({ page = 1, limit = 3, featured = false }) => {
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

const addCar = async (carData) => {
  try {
    const {
      brand = "",
      year = "",
      category = "",
      seating_capacity = "",
      fuel_type = "",
      transmission = "",
      pricePerDay = "",
      description = "",
      image = null,
      featured = false,
    } = carData;

    const formData = new FormData();
    formData.append("owner", "owner");
    formData.append("brand", brand);
    formData.append("year", year);
    formData.append("category", category);
    formData.append("seating_capacity", seating_capacity);
    formData.append("fuel_type", fuel_type);
    formData.append("transmission", transmission);
    formData.append("pricePerDay", pricePerDay);
    formData.append("description", description);
    formData.append("featured", featured);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(`${API_URL}/add-car`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    console.log("Car added:", data);
    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (err) {
    console.error("Error:", err.message);
  }
};

export { fetchSearchCar, fetchCars, fetchCar, addCar };
