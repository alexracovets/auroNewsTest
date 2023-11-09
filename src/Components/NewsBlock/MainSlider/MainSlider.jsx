import PropTypes from 'prop-types';

import CustomSlider from "../../CustomSlider/CustomSlider";

import s from '../NewsBlock.module.scss';
import Slide from './Slide/Slide';

MainSlider.propTypes = {
    slides: PropTypes.array,
    goToPage: PropTypes.func,
    setActiveSlide: PropTypes.func,
    setSlider: PropTypes.func
};

export default function MainSlider({ slides, goToPage, setActiveSlide, setSlider }) {

    const renderSlide = () => {
        return slides.map((news, index) => (
            <Slide news={news} goToPage={goToPage} key={index} />
        ));
    };

    return (
        <section className={s.newsSlider}>
            <div className={s.slider}>
                <CustomSlider renderSlide={renderSlide} afterChange={(index) => setActiveSlide(index)} setSlider={setSlider} isArrow={true} />
            </div>
            <div className={s.circles}>
                <div className={s.first}></div>
            </div>
        </section>
    )
}
