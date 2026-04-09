import React from "react";

const ListYourCar = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>
        
        <h2 className="mb-3">List Your Car 🚗</h2>

        <p className="text-muted">
          Want to rent out your car on our platform?
          <br />
          Please contact our admin team to get started.
        </p>

        <p className="text-secondary">
          Our team will verify your vehicle and guide you through the process.
        </p>

        <hr />

        {/* Contact Info */}
        <div className="mb-3">
          <h6 className="fw-bold">📧 Email</h6>
          <p className="text-primary mb-0">admin@yourapp.com</p>
        </div>

        <div className="mb-3">
          <h6 className="fw-bold">📞 Phone</h6>
          <p className="text-primary mb-0">+91 9876543210</p>
        </div>

        {/* Buttons */}
        <div className="d-grid gap-2 mt-3">
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "mailto:admin@yourapp.com")}
          >
            Contact via Email
          </button>

          <button
            className="btn btn-success"
            onClick={() => window.open("https://wa.me/919876543210", "_blank")}
          >
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListYourCar;