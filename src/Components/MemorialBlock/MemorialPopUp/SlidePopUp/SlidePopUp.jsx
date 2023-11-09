import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import s from '../../MemorialBlock.module.scss';
import Cross from './Cross/Cross';

SlidePopUp.propTypes = {
    selectedItem: PropTypes.object,
    closePopUp: PropTypes.func,
};

export default function SlidePopUp({ selectedItem, closePopUp }) {

    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = selectedItem.image;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, [selectedItem.image]);

    return (
        <div className={s.PopUp_wrapper}>
            <Cross closePopUp={closePopUp} />
            <div className={s.wrapper__top}>
                <div className={isLoadImage ? s.img + ' ' + s.active : s.img} style={{ backgroundImage: `url(${selectedItem.image})` }}>
                </div>
                <div className={s.info}>
                    <div className={s.name}>{selectedItem.title}</div>
                    <div className={s.position}>{selectedItem.position}</div>
                </div>
            </div>
            <div className={s.wrapper_content}>
                {selectedItem.text && selectedItem.text.map((item) => (
                    <p key={item.key} className={item.bold ? s.bold : null}>{item.value}</p>
                ))}
            </div>
        </div>
    )
}
