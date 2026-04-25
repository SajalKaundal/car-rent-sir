const API_URL = import.meta.env.VITE_API_URL

const fetchBookings = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/bookings?userId=${userId}`);
    const data = await response.json();
    return data.bookings;
  } catch (err) {
    console.error(err.message);
  }
};

export {fetchBookings}