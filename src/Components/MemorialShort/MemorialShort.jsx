
import CustomButton from '../CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import memorial from '/img/memorial.jpg';

import s from './MemorialShort.module.scss';

export default function MemorialShort() {

    return (
        <section className={s.memorialShort}>
            <h3 className={s.title}>
                Наші Герої
            </h3>
            <div className={s.memorialShort_wrapper}>
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
                    <Link to="/memorial">
                        <CustomButton text={"читати більше"} />
                    </Link>
                </div>
                <div className={s.right}>
                    <img src={memorial} alt="" />
                </div>
            </div>
        </section>
    )
}
