import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-5 px-3  pt-5 footer">
      <div className="row">
        <div className="col">
          <h3>About</h3>
          <p>From City Streets to Mountain roads — find your perect car.</p>
          <div className="d-flex gap-1">
            <IoLogoGooglePlaystore />
            <FaFacebook />
            <AiFillInstagram />
            <FaYoutube />
          </div>
          <div className="mt-4 w-75">
            Drive excellence. Experience true luxury. Every journey with us is
            crafted for comfort and class.
          </div>
        </div>
        <div className="col-lg-2">
          <h3>Categories</h3>
          <p>Economy Cars</p>
          <p>SUVs</p>
          <p>Luxary Cars</p>
          <p>Electric Vehicles</p>
        </div>
        <div className="col-lg-2">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Cars</p>
          <p>My Booking</p>
          <p>About</p>
          <p>Contact</p>
        </div>
        <div className="col-lg-2">
          <h3>Support / Help</h3>
          <p>FAQs</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Cancellation Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
