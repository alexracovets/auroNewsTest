import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import s from '../../../MemorialBlock.module.scss';
import cross from '/img/cross.svg';

Cross.propTypes = {
    closePopUp: PropTypes.func,
};

export default function Cross({ closePopUp }) {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = cross;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, []);
    return (
        <div className={isLoadImage ? s.cross + ' ' + s.active : s.cross} onClick={() => closePopUp()} style={{ backgroundImage: `url(${cross})` }}>
        </div>
    )
}
