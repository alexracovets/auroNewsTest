import PropTypes from 'prop-types';

import s from './Museums.module.scss';
import { useEffect, useState } from 'react';

Museums.propTypes = {
    currentMemo: PropTypes.array.isRequired,
    showInfo: PropTypes.func.isRequired,
    currentSlide: PropTypes.number.isRequired,
};

export default function Museums({ currentMemo, showInfo, currentSlide }) {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        setMuseums(currentMemo)
    }, [currentMemo])


    return (
        <div className={s.museums}>
            {
                museums.map((item, index) => (
                    <div className={currentSlide === index ? s.item + ' ' + s.active : s.item} key={index} onClick={() => { showInfo(index) }}>
                        <div className={s.item__image} style={{ backgroundImage: `url(${item.image})` }}> </div>
                    </div>
                ))
            }
        </div>
    )
}
