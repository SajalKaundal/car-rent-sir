import { testimonials } from "../assets/assests";

const Testimonials = () => {
  return (
    <div className="mt-5 container">
      <h2 className="text-center">What Our Customer Say</h2>
      <div className="container text-center mt-5">
        <div className="row gy-3">
          {testimonials.map((data) => {
            return (
              <div className="col-lg-3" key={data._id}>
                <div className="card-text d-">
                  <img
                    src={data.img}
                    alt="here is an image"
                    className="img-fluid image-testimonial"
                    loading="lazy"
                  />
                  <div className="mt-5">
                    <p>{data.name}</p>
                    <p>{data.comment}</p>
                  </div>
                  <hr />
                  <p>Customer Rating: {data.rating}</p>
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
