import { useEffect, useState } from "react";
// import { dummyMyBooking } from "../assets/assests";
import Booking from "../components/Booking";
import Title from "../components/Title";
const MyBookings = () => {
  // let count = 1;
  const API_URL = import.meta.env.VITE_API_URL
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${API_URL}/bookings?userId=70user001`,
        );
        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBookings();
  }, [API_URL]);
  return (
    <div className="container mt-4">
      <Title
        title="My Bookings"
        subTitle="View and manage your all car bookings"
      />
      <div className="row">
        {bookings.map((booking, index) => (
          <Booking booking={booking} index={index+1} key={booking._id} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
