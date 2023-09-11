import { useDispatch } from 'react-redux';

import CustomButton from "../CustomButton/CustomButton";
import CustomSlider from "../CustomSlider/CustomSlider";

import s from './ShortInfo.module.scss';

import { setInfo } from '../../store/reducers/popups.js';

export default function ShortInfo() {

    const dispatch = useDispatch();

    const newsList = [
        {
            photo: 'Фото1',
            text: 'Коротка інформація1'
        },
        {
            photo: 'Фото2',
            text: 'Коротка інформація2'
        },
        {
            photo: 'Фото3',
            text: 'Коротка інформація3'
        }
    ]
    const OnHandler = (item) => {
        dispatch(setInfo(item));
    }

    const renderSlide = () => {
        return newsList.map((item, index) => (
            <div className={s.slide} key={index}>
                <div className={s.content}>
                    <div className={s.photo}>{item.photo}</div>
                    <div className={s.info}>{item.text}</div>
                </div>
                <div className={s.all} onClick={() => OnHandler(item)}>
                    <CustomButton text="Кнопка переходу" />
                </div>
            </div>
        ));
    };
    return (
        <div className={s.short_info}>
            <h3 className={s.title}>
                Інфо
            </h3>
            <div className={s.slider}>
                <CustomSlider renderSlide={renderSlide} />
            </div>
        </div>
    )
}
