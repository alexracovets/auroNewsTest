import { useEffect, useState } from 'react';
import main from '/img/main.jpg';

import s from './TitleBlock.module.scss';

export default function TitleBlock() {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = main;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, []);

    return (
        <section className={s.tittle_context}>
            <h2 className={s.title}>
                <span>Аврора:</span> шлях до перемоги
            </h2>
            <div className={s.sub_title}>
                Аврора від початку повномасштабного вторгнення не тільки не призупинила свою роботу, а тільки зросла й зміцніла. <b>Чому?</b>
            </div>
            <div className={s.hero_block}>
                <div className={s.block__title}>
                    Тому що Аврора - справжні герої та героїні свого часу, які:
                </div>
                <ul className={s.block__list}>
                    <li>захищають Україну, навіть ціною власного життя;</li>
                    <li>щодня працюють, щоб підтримувати країну економічно;</li>
                    <li>волонтерять, донатять та допомагають чим можуть;</li>
                </ul>
            </div>
            <div className={isLoadImage ? s.title_image + ' ' + s.active : s.title_image} style={{ backgroundImage: `url(${main})` }}>
            </div>
            <div className={s.circles}>
                <div className={s.first}></div>
                <div className={s.second}></div>
                <div className={s.third}></div>
                <div className={s.fourd}></div>
                <div className={s.fifth}></div>
                <div className={s.sixth}></div>
                <div className={s.seventh}></div>
            </div>
        </section>
    )
}
