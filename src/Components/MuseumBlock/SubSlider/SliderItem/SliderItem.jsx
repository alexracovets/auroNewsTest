import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

SliderItem.propTypes = {
    currentSlide: PropTypes.number,
    item: PropTypes.object,
    index: PropTypes.number,
    toSlide: PropTypes.func,
};

import s from "../SubSlider.module.scss";

export default function SliderItem({ currentSlide, item, index, toSlide }) {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = import.meta.env.VITE_SERVER_URL === '' ? item.image : import.meta.env.VITE_SERVER_URL + `/${item.image}`;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, [item.image]);

    return (
        <div className={s.item} onClick={() => toSlide(index)}>
            <div
                className={
                    isLoadImage ? (currentSlide === index ? s.item__image + " " + s.active : s.item__image) + ' ' + s.show :
                        currentSlide === index ? s.item__image + " " + s.active : s.item__image
                }
                style={{ backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}${item.image})` }}
            ></div>
        </div>
    );
}
