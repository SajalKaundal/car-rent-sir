import FeaturedSection from "../components/FeaturedSection";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
