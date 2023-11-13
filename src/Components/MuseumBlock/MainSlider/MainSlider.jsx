import PropTypes from 'prop-types';
import Slider from "react-slick";

import CustomArrow from "../../CustomSlider/CustomArrow/CustomArrow";

MainSlider.propTypes = {
    slides: PropTypes.array,
    setIsPopUpOpen: PropTypes.func,
    slider1: PropTypes.object,
    slider2: PropTypes.object,
    currentSlide: PropTypes.number,
    setCurrentSlide: PropTypes.func,
};

import s from "./MainSlider.module.scss";
import SliderItem from './SliderItem/SliderItem';

export default function MainSlider({ slides, setIsPopUpOpen, slider1, slider2, currentSlide, setCurrentSlide }) {

    const setting = {
        arrows: true,
        dots: false,
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 300,
        swipeToSlide: true,
        fade: true,
        cssEase: 'linear',
        prevArrow: <CustomArrow
            vector="prev"
            clickAction={() => slider1.current.slickPrev()}
            currentSlide={Number(currentSlide)}
            slider={slider1}
        />,
        nextArrow: <CustomArrow
            vector="next"
            clickAction={() => slider1.current.slickNext()}
            currentSlide={Number(currentSlide)}
            slider={slider1}
        />,
        afterChange: (index) => {
            setCurrentSlide(index);
        },
    };

    const renderSlide = () => {
        return slides.map((item) => (
            <SliderItem key={item.key} item={item} setIsPopUpOpen={setIsPopUpOpen} />
        ));
    };

    return (
        <div className={s.slider}>
            <Slider asNavFor={slider2.current} ref={slider1} {...setting}>
                {renderSlide()}
            </Slider>
        </div>
    );
}
