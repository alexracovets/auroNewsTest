import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import DarkArrow from "../../CustomSlider/DarkArrow/DarkArrow";
import SlideItem from './SlideItem/SlideItem';

import s from '../MemorialBlock.module.scss';

SliderWrapper.propTypes = {
    fitered: PropTypes.array,
    moreInfo: PropTypes.func
};

export default function SliderWrapper({ fitered, moreInfo }) {
    const sliderRef = useRef(null);

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
            <DarkArrow
                vector="prev"
                clickAction={() => {
                    sliderRef.current.slickPrev();
                }}
                slider={sliderRef}
            />
        ,
        nextArrow: <DarkArrow
            vector="next"
            clickAction={() => {
                sliderRef.current.slickNext()
            }}
            slider={sliderRef}
        />
    };

    const renderSlide = () => {
        return (
            fitered.length > 0 ? (
                fitered.map((memo, index) => (
                    <SlideItem memo={memo} moreInfo={moreInfo} key={index} />
                ))
            ) : (
                <div className={s.slide + ' ' + s.noResault}>
                    Пошук не дав результатів
                </div >
            )
        );
    };

    useEffect(() => {
        sliderRef.current.slickGoTo(0);
    }, [fitered]);

    return (
        <div className={s.slider__mobile}>
            <Slider ref={sliderRef} {...settings} >
                {renderSlide()}
            </Slider>
        </div>
    )
}
