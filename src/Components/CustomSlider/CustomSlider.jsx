import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import CustomArrow from "./CustomArrow/CustomArrow";
import DarkArrow from "./DarkArrow/DarkArrow";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

CustomSlider.propTypes = {
    renderSlide: PropTypes.func.isRequired,
    afterChange: PropTypes.func,
    setSlider: PropTypes.func,
    isArrow: PropTypes.bool.isRequired,
    dark: PropTypes.bool,
};

export default function CustomSlider({ renderSlide, afterChange, setSlider, isArrow, dark }) {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setSlider && setSlider(sliderRef.current)
    }, [sliderRef])

    const settings = {
        arrows: isArrow,
        dots: false,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
            dark ?
                <DarkArrow
                    vector="prev"
                    clickAction={() => sliderRef.current.slickPrev()}
                    currentSlide={Number(currentSlide)}
                    slider={sliderRef}
                /> :
                <CustomArrow
                    vector="prev"
                    clickAction={() => sliderRef.current.slickPrev()}
                    currentSlide={Number(currentSlide)}
                    slider={sliderRef}
                />
        ,
        nextArrow:
            dark ? <DarkArrow
                vector="next"
                clickAction={() => sliderRef.current.slickNext()}
                currentSlide={Number(currentSlide)}
                slider={sliderRef}
            /> :
                <CustomArrow
                    vector="next"
                    clickAction={() => sliderRef.current.slickNext()}
                    currentSlide={Number(currentSlide)}
                    slider={sliderRef}
                />
        ,
        afterChange: (index) => {
            setCurrentSlide(index);
            afterChange && afterChange(index);
        },
    };

    return (
        <Slider ref={sliderRef} {...settings}>
            {renderSlide()}
        </Slider>
    )
}
