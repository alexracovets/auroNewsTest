import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';
import museum from '/img/museum.jpg';

import s from './MuseumShort.module.scss';

export default function MuseumShort() {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = museum;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, []);

    return (
        <section className={s.MuseumShort}>
            <h3 className={s.title}>Музей</h3>
            <div className={s.MuseumShort_wrapper + ' ' + s.desktop}>
                <div className={isLoadImage ? s.left + ' ' + s.active : s.left} style={{ backgroundImage: `url(${museum})` }}></div>
                <div className={s.rigth}>
                    <div className={s.wrapper__title}>
                        Ми створили віртуальний музей подяк, нагород та трофеїв компанії &#34;Аврора&#34;, отриманих у період великої війни.
                    </div>
                    <ul className={s.list}>
                        <li>жовто-блакитний прапор, підписаний захисниками за підтримку у зборі коштів на позашляховик для передової</li>
                        <li>уламки ракет, збитих ППО</li>
                        <li>відзнака Президента України, виготовлена з бахмутської солі та кримського ракушняка</li>
                        <li>амуніція, покинута ворогом на позиції</li>
                    </ul>
                    <div className={s.description}>
                        У цьому розділі маєте можливість побачити ексклюзивну колекцію Аврори.
                    </div>
                    <div className={s.btn}><Link to="/museum"><CustomButton text={"читати більше"} /></Link></div>
                </div>
            </div>
            <div className={s.MuseumShort_wrapper + ' ' + s.mobile}>
                <div className={s.backSide}>
                    <div className={s.circles}>
                        <div className={s.first}></div>
                        <div className={s.second}></div>
                        <div className={s.third}></div>
                        <div className={s.fourd}></div>
                    </div>
                </div>
                <div className={isLoadImage ? s.img + ' ' + s.active : s.img} style={{ backgroundImage: `url(${museum})` }}></div>
                <Link to="/museum">
                    <CustomButton text={"читати більше"} />
                </Link>
            </div>

            <div className={s.circles}>
                <div className={s.first}></div>
                <div className={s.second}></div>
                <div className={s.third}></div>
                <div className={s.fourd}></div>
                <div className={s.fifth}></div>
                <div className={s.sixth}></div>
            </div>
        </section>
    )
}
