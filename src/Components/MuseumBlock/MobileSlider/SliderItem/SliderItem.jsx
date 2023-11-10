import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CustomButton from "../../../CustomButton/CustomButton";
import checkLength from '../../../../const/checkLength';

import s from "../../MuseumBlock.module.scss";

SliderItem.propTypes = {
    item: PropTypes.object,
    setIsPopUpOpen: PropTypes.func
};

export default function SliderItem({ item, setIsPopUpOpen }) {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = item.image;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, [item.image]);

    return (
        <div className={s.item} key={item.key}>
            <div className={isLoadImage ? s.item__image + ' ' + s.active : s.item__image} style={{ backgroundImage: `url(${item.image})` }} ></div>
            <div className={s.item__content}>
                <div className={s.description}>{item.title}</div>
                <div className={s.item__texts}>
                    {item.text && (item.text[0] && <p>{checkLength(item.text[0].value, 90)}</p>)}
                    {item.text && (item.text[1] && <p>{checkLength(item.text[1].value, 90)}</p>)}
                </div>
                <div className={s.btn} onClick={() => { setIsPopUpOpen(true) }}>
                    <CustomButton text={"детальніше"} />
                </div>
            </div>
        </div>
    );
}
