const API_URL = import.meta.env.VITE_API_URL;

// helper to handle response
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data;
};

// GET ALL BOOKINGS
const fetchAllBookings = async (user) => {
  try {
    const token = await user.getIdToken();
    const response = await fetch(`${API_URL}/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    console.error("Fetch All Bookings Error:", err.message);
    throw err;
  }
};

// GET USER BOOKINGS
const fetchBookings = async (user, userId) => {
  try {
    const token = await user.getIdToken();
    if (!userId) {
      throw new Error("userId required");
    }

    const response = await fetch(`${API_URL}/bookings/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    console.error("Fetch User Bookings Error:", err.message);
    throw err;
  }
};

// CREATE BOOKING
const addBooking = async (user,{
  userId,
  carId,
  pickupLocation,
  pickupDate,
  returnDate,
}) => {
  try {
    const token = await user.getIdToken()
    if (!userId || !carId || !pickupLocation || !pickupDate || !returnDate) {
      throw new Error("All fields are required");
    }

    const response = await fetch(`${API_URL}/bookings/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        carId,
        pickupLocation,
        pickupDate,
        returnDate,
      }),
    });

    return await handleResponse(response);
  } catch (err) {
    console.error("Booking Error:", err.message);
    throw err;
  }
};

export { fetchBookings, addBooking, fetchAllBookings };
