import PropTypes from 'prop-types';

import s from './Museums.module.scss';
import { useEffect, useState } from 'react';
import Museum from './Museum/Museum';

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
                    <Museum key={index} index={index} item={item} showInfo={showInfo} currentSlide={currentSlide} />
                ))
            }
        </div>
    )
}
