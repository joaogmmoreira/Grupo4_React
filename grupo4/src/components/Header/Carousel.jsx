import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Header.css";

export default function ImageCarousel() {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div>
        <img
          src="https://img.terabyteshop.com.br/banner/3146.jpg"
          alt="Slide 1"
        />
        {/* <p className="legend">Slide 1</p> */}
      </div>
      <div>
        <img
          src="https://img.terabyteshop.com.br/banner/3161.jpg"
          alt="Slide 2"
        />
        {/* <p className="legend">Slide 2</p> */}
      </div>
      <div>
        <img
          src="https://img.terabyteshop.com.br/banner/3000.jpg"
          alt="Slide 3"
        />
        {/* <p className="legend">Slide 3</p> */}
      </div>
    </Carousel>
  );
}
