import CustomCircle from '../CustomCircle/CustomCircle';

import s from './TitleBlock.module.scss';

import main from '/img/main.jpg'

export default function TitleBlock() {

    const circle = {
        radius: "19.375rem",
        position: {
            top: '-4.3125rem',
            bottom: 'auto',
            left: 'auto',
            right: '-4.3125rem'
        }
    }

    return (
        <section className={s.tittle_context}>
            <h2>
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
            <div className={s.title_image}>
                <img src={main} alt="CHK" />
            </div>
            <CustomCircle radius={circle.radius} position={circle.position} />
        </section>
    )
}
