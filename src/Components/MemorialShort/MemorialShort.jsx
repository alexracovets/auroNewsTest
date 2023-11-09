import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';
import memorial from '/img/memorial.jpg';

import s from './MemorialShort.module.scss';

export default function MemorialShort() {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = memorial;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, []);
    
    return (
        <section className={s.memorialShort}>
            <h3 className={s.title}>
                Наші Герої
            </h3>
            <div className={s.memorialShort_wrapper + ' ' + s.desktop}>
                <div className={s.left}>
                    <div className={s.wrapper__title}>
                        Це віртуальна дошка пам&#39;яті аврорівців, які після 24 лютого 2022 року стали на захист країни.
                    </div>
                    <div className={s.description}>
                        <div className={s.item}>
                            Вони віддали найдорожче - <b>своє життя</b> - заради нашого майбутнього у вільній і незалежній Україні.
                        </div>
                        <div className={s.item}>
                            Ми вшановуємо наших полеглих колег, щоб завжди <b>пам’ятати</b> ціну перемоги.
                        </div>
                    </div>
                    <div className={s.btn}>
                        <Link to="/memorial"><CustomButton text={"читати більше"} /></Link>
                    </div>
                </div>
                <div className={isLoadImage ? s.right + ' ' + s.active : s.right} style={{ backgroundImage: `url(${memorial})` }}></div>
            </div>
            <div className={s.memorialShort_wrapper + ' ' + s.mobile}>
                <div className={s.backSide}>
                    <div className={s.circles}>
                        <div className={s.first}></div>
                        <div className={s.second}></div>
                        <div className={s.third}></div>
                        <div className={s.fourd}></div>
                    </div>
                </div>
                <div className={isLoadImage ? s.img + ' ' + s.active : s.img} style={{ backgroundImage: `url(${memorial})` }}></div>
                <Link to="/memorial">
                    <CustomButton text={"читати більше"} />
                </Link>
            </div>

            <div className={s.circles}>
                <div className={s.first}></div>
            </div>
        </section>
    )
}
