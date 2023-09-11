import Slider from "react-slick";
import PropTypes from "prop-types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

CustomSlider.propTypes = {
    renderSlide: PropTypes.func.isRequired,
};

export default function CustomSlider({ renderSlide }) {

    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {renderSlide()}
        </Slider>
    )
}
