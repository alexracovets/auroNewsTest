import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import CustomArrow from "./CustomPrevArrow/CustomArrow";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

CustomSlider.propTypes = {
    renderSlide: PropTypes.func.isRequired,
    afterChange: PropTypes.func.isRequired,
    setSlider: PropTypes.func.isRequired
};

export default function CustomSlider({ renderSlide, afterChange, setSlider }) {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setSlider(sliderRef.current)
    }, [sliderRef])

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomArrow
            vector="prev"
            clickAction={() => sliderRef.current.slickPrev()}
            currentSlide={Number(currentSlide)}
            slider={sliderRef}
        />,
        nextArrow: <CustomArrow
            vector="next"
            clickAction={() => sliderRef.current.slickNext()}
            currentSlide={Number(currentSlide)}
            slider={sliderRef}
        />,
        afterChange: (index) => {
            setCurrentSlide(index);
            afterChange(index);
        },
    };

    return (
        <Slider ref={sliderRef} {...settings}>
            {renderSlide()}
        </Slider>
    )
}
