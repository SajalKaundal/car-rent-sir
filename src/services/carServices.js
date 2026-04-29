const API_URL = import.meta.env.VITE_API_URL;

//fetch Car when searching
const fetchSearchCar = async (user,{ page = 1, limit = 9, search = "", signal }) => {
  try {
    const token = await user.getIdToken()
    const response = await fetch(
      `${API_URL}/car/?page=${page}&limit=${limit}&search=${search}`,
      {
        signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

const fetchCars = async (user,{ page = 1, limit = 3, featured = false }) => {
  try {
    const token = await user.getIdToken()
    const response = await fetch(
      `${API_URL}/car/?page=${page}&limit=${limit}&featured=${featured}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

const fetchCar = async (user,_id = null) => {
  if (!_id) {
    console.log("_id is required");
    return "";
  }
  try {
    const token = await user.getIdToken()
    const response = await fetch(`${API_URL}/car/${_id}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const car = await response.json();
    return car;
  } catch (err) {
    console.error(err.message);
  }
};

const addCar = async (user,carData) => {
  try {
    const token = await user.getIdToken()
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

    const res = await fetch(`${API_URL}/car`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
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

const updateCar = async (user,id, carData) => {
  try {
    const token = await user.getIdToken()
    const formData = new FormData();

    Object.keys(carData).forEach((key) => {
      if (key === "image") {
        if (carData.image instanceof File) {
          formData.append("image", carData.image);
        }
      } else {
        formData.append(key, carData[key]);
      }
    });

    const res = await fetch(`${API_URL}/car/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

const deleteCar = async (user,id) => {
  try {
    const token = await user.getIdToken()
    const res = await fetch(`${API_URL}/car/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err.message);
  }
};
export { fetchSearchCar, fetchCars, fetchCar, addCar, updateCar, deleteCar };
