import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import CustomButton from "../../../CustomButton/CustomButton";
import checkLength from '../../../../const/checkLength';

SliderItem.propTypes = {
    item: PropTypes.object,
    setIsPopUpOpen: PropTypes.func
};

import s from "../MainSlider.module.scss";

export default function SliderItem({ item, setIsPopUpOpen }) {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = import.meta.env.VITE_SERVER_URL === '' ? item.image : import.meta.env.VITE_SERVER_URL + `/${item.image}`;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, [item.image]);

    return (
        <div className={s.item} key={item.key}>
            <div
                className={isLoadImage ? s.item__image + ' ' + s.active : s.item__image}
                style={{ backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}${item.image})` }}
                onClick={() => { setIsPopUpOpen(true) }}
            ></div>
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
    );
}
