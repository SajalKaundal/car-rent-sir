const API_URL = import.meta.env.VITE_API_URL;

const fetchBookings = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId required");
    }
    const response = await fetch(`${API_URL}/bookings/${userId}`);
    const data = await response.json();
    return data.bookings;
  } catch (err) {
    console.error(err.message);
  }
};

const addBooking = async ({
  userId,
  carId,
  pickupLocation,
  pickupDate,
  returnDate,
}) => {
  try {
  
    if (!userId || !carId || !pickupLocation || !pickupDate || !returnDate) {
      throw new Error("All fields are required");
    }
    const response = await fetch(
      `${API_URL}/bookings/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carId,
          pickupLocation,
          pickupDate,
          returnDate,
        }),
      }
    );

    const data = await response.json();

   
    if (!response.ok) {
      throw new Error(data.message || "Booking failed");
    }

   
    return data;

  } catch (err) {
    console.error("Booking Error:", err.message);
    throw err; // so UI can handle it
  }
};
export { fetchBookings, addBooking };
