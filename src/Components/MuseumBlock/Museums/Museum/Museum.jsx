import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import s from '../Museums.module.scss';

Museum.propTypes = {
    index: PropTypes.number,
    item: PropTypes.object,
    showInfo: PropTypes.func,
    currentSlide: PropTypes.number,
};

export default function Museum({ index, item, showInfo, currentSlide }) {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = import.meta.env.VITE_SERVER_URL === '' ? item.image : import.meta.env.VITE_SERVER_URL + `/${item.image}`;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, [item.image]);

    return (
        <div className={currentSlide === index ? s.item + ' ' + s.active : s.item} onClick={() => { showInfo(index) }}>
            <div className={isLoadImage ? s.item__image + ' ' + s.active : s.item__image} style={{ backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}${item.image})` }}> </div>
        </div>
    )
}
