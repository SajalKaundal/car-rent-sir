import { testimonials } from "../assets/assests";

const Testimonials = () => {
  return (
    <div className="mt-5 container">
      <h2 className="text-center">What Our Customer Say</h2>
      <div className="container text-center mt-5">
        <div className="row gy-3">
          {testimonials.map((data) => {
            return (
              <div className="col-lg-3 d-flex" key={data._id}>
                <div className="card w-100 h-100 shadow-sm d-flex flex-column">
                  <img
                    src={data.img}
                    alt="testimonial"
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                    loading="lazy"
                  />

                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-bold">{data.name}</h6>

                    <p
                      className="flex-grow-1 text-muted"
                      style={{ overflow: "hidden" }}
                    >
                      {data.comment}
                    </p>

                    <hr />

                    <p className="mb-0">Customer Rating: {data.rating}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
