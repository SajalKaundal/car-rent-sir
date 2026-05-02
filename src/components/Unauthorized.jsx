import { useNavigate } from "react-router";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">403</h1>
        <h2 className="mb-3">Unauthorized Access</h2>
        <p className="text-muted mb-4">
          You don’t have permission to view this page.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;