import PropTypes from 'prop-types';
import Slider from "react-slick";

import SubArrow from "../SubArrow/SubArrow";

SubSlider.propTypes = {
    slides: PropTypes.array,
    slider1: PropTypes.object,
    slider2: PropTypes.object,
    currentSlide: PropTypes.number,
    setCurrentSlide: PropTypes.func,
};

import s from "./SubSlider.module.scss";

export default function SubSlider({ slides, slider1, slider2, currentSlide }) {

    const toSlide = (index) => {
        slider1.current.slickGoTo(index);
        slider2.current.slickGoTo(index)
    }

    const setting = {
        infinite: true,
        arrows: true,
        slidesToShow: slides.length >= 9 ? 9 : slides.length,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        className: s.slick,
        centerPadding: '0',
        speed: 0,
    };

    const renderSlide = () => {
        return slides.map((item, index) => (
            <div className={s.item} key={item.key} onClick={() => toSlide(index)}>
                <div
                    className={
                        currentSlide === index ? s.item__image + " " + s.active : s.item__image
                    }
                    style={{ backgroundImage: `url(${item.image})` }}
                ></div>
            </div>
        ));
    };

    return (
        <div className={s.sub_slider}>
            <Slider
                asNavFor={slider1.current}
                ref={slider2}
                {...setting}
            >
                {renderSlide()}
            </Slider>
            <div className={s.arrows}>
                <SubArrow
                    vector="prev"
                    clickAction={() => {
                        slider2.current.slickPrev();
                    }}
                    currentSlide={Number(currentSlide)}
                    slider={slider2}
                    itemsLength={slides.length}
                />
                <SubArrow
                    vector="next"
                    clickAction={() => {
                        slider2.current.slickNext();
                    }}
                    currentSlide={Number(currentSlide)}
                    slider={slider2}
                    itemsLength={slides.length}
                />
            </div>
        </div>
    );
}
