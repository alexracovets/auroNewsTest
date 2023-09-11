import CustomButton from "../CustomButton/CustomButton";
import CustomSlider from "../CustomSlider/CustomSlider";

import s from './ShortMuseum.module.scss';

export default function ShortMuseum() {

    const museumList = [
        {
            photo: 'Фото1',
            short: 'Коротка інформація1'
        },
        {
            photo: 'Фото2',
            short: 'Коротка інформація2'
        },
        {
            photo: 'Фото3',
            short: 'Коротка інформація3'
        }
    ]

    const renderSlide = () => {
        return museumList.map((item, index) => (
            <div className={s.slide} key={index}>
                <div className={s.content}>
                    <div className={s.photo}>{item.photo}</div>
                    <div className={s.info}>{item.short}</div>
                </div>
                <div className={s.all}>
                    <CustomButton text="Кнопка переходу" />
                </div>
            </div>
        ));
    };
    return (
        <div className={s.short_museum}>
            <h3 className={s.title}>
                Музей
            </h3>
            <div className={s.slider}>
                <CustomSlider renderSlide={renderSlide} />
            </div>
        </div>
    )
}
