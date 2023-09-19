import Slider from "react-slick";
import PropTypes from "prop-types";
import CustomArrow from "./CustomPrevArrow/CustomArrow";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

CustomSlider.propTypes = {
    renderSlide: PropTypes.func.isRequired,
};

export default function CustomSlider({ renderSlide }) {

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomArrow vector="prev" />,
        nextArrow: <CustomArrow vector="next" />
    };

    return (
        <Slider {...settings}>
            {renderSlide()}
        </Slider>
    )
}
