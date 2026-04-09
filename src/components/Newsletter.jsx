const Newsletter = () => {
  return (
    <div className="newsletter container mt-5 text-center p-5">
      <h2>Never Miss a Deal</h2>
      <p>
        Subscribe to get the latest offer, new arrivals and exclusive discounts
      </p>
      <div>
        <form>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <input
              type="text"
              placeholder="Enter your email id"
              required
              className="form-control"
            />
            <button className="btn btn-primary" type="button">
              Button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
