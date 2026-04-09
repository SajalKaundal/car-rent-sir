import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="banner mt-5 text-center">
      <div className="banner-text">
        <h2>Do You Own a Luxary Car?</h2>
        <p className="mt-3">
          Monetize your vehicle effortlessly by listing it on carRent.
        </p>
        <p>
          We take care of insurance, driver verification and secure payements,
          so you can earn passive income, stress-free.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/list-your-car")}
        >
          List your Car
        </button>
      </div>
    </div>
  );
};

export default Banner;
