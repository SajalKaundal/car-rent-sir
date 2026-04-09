import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center" style={{ marginTop: "100px" }}>
      <h1 style={{ fontSize: "80px", fontWeight: "bold" }}>404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">
        Oops! The page you are looking for does not exist.
      </p>

      <Link to="/" className="btn btn-dark">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;