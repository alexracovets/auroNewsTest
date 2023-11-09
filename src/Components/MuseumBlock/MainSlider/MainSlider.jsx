import PropTypes from 'prop-types';
import Slider from "react-slick";

import CustomArrow from "../../CustomSlider/CustomArrow/CustomArrow";
import CustomButton from "../../CustomButton/CustomButton";
import checkLength from '../../../const/checkLength';

MainSlider.propTypes = {
    slides: PropTypes.array,
    setIsPopUpOpen: PropTypes.func,
    slider1: PropTypes.object,
    slider2: PropTypes.object,
    currentSlide: PropTypes.number,
    setCurrentSlide: PropTypes.func,
};

import s from "./MainSlider.module.scss";

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
            <div className={s.item} key={item.key}>
                <div className={s.item__image} style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className={s.item__content}>
                    <div className={s.description}>{item.title}</div>
                    <div className={s.item__texts}>
                        {item.text && (item.text[0] && <p>{checkLength(item.text[0].value, 246)}</p>)}
                        {item.text && (item.text[1] && <p>{checkLength(item.text[1].value, 120)}</p>)}
                        {item.text && (item.text[2] && <p>...</p>)}
                    </div>
                    <div className={s.btn} onClick={() => { setIsPopUpOpen(true) }}>
                        <CustomButton text={"детальніше"} />
                    </div>
                </div>
                <div className={s.circles}>
                    <div className={s.first}></div>
                    <div className={s.second}></div>
                    <div className={s.third}></div>
                    <div className={s.fourd}></div>
                </div>
            </div>
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
