import PropTypes from 'prop-types';
import Slider from "react-slick";

import CustomArrow from "../../CustomSlider/CustomArrow/CustomArrow";

import s from "../MuseumBlock.module.scss";
import SliderItem from './SliderItem/SliderItem';

MobileSlider.propTypes = {
    isInfo: PropTypes.bool,
    slides: PropTypes.array,
    slider3: PropTypes.object,
    currentSlide: PropTypes.number,
    setCurrentSlide: PropTypes.func,
    setIsPopUpOpen: PropTypes.func
};

export default function MobileSlider({ isInfo, slides, slider3, currentSlide, setCurrentSlide, setIsPopUpOpen }) {

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 300,
        swipeToSlide: true,
        prevArrow: <CustomArrow
            vector="prev"
            clickAction={() => {
                slider3.current.slickPrev();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider3}
        />,
        nextArrow: <CustomArrow
            vector="next"
            clickAction={() => {
                slider3.current.slickNext();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider3}
        />,
        afterChange: (index) => {
            setCurrentSlide(index);
        },
    };

    const renderMobileSlide = () => {
        return slides.map((item) => (
            <SliderItem key={item.key} item={item} setIsPopUpOpen={setIsPopUpOpen} />
        ));
    };

    return (
        <div className={isInfo ? s.short__info + ' ' + s.active : s.short__info}>
            <div className={s.mobile_slider}>
                <Slider
                    ref={slider3}
                    {...settings}
                >
                    {renderMobileSlide()}
                </Slider>
            </div>
        </div>
    );
}
