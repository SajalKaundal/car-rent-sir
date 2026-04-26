import { useEffect, useState } from "react";
// import { dummyMyBooking } from "../assets/assests";
import Booking from "../components/Booking";
import Title from "../components/Title";
import { fetchBookings } from "../services/bookingsServices";
const MyBookings = () => {
  // let count = 1;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
   const getBookings = async ()=>{
    const data = await fetchBookings('70user001')
    setBookings(data || [])
   }
   getBookings()
  }, []);
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
