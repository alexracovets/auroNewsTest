import { Link } from 'react-router-dom';
import museum from '/img/museum.jpg';

import s from './MuseumShort.module.scss';
import CustomButton from '../CustomButton/CustomButton'; 

export default function MuseumShort() {

    return (
        <section className={s.MuseumShort}>
            <h3 className={s.title}>Музей</h3>
            <div className={s.MuseumShort_wrapper + ' ' + s.desktop}>
                <div className={s.left}>
                    <img src={museum} alt="meseum" />
                </div>
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
                    <Link to="/museum">
                        <CustomButton text={"читати більше"} />
                    </Link>
                </div>
            </div>
            <div className={s.MuseumShort_wrapper + ' ' + s.mobile}>
                <div className={s.img} style={{ backgroundImage: `url(${museum})` }}>
                </div>
                <Link to="/museum">
                    <CustomButton text={"читати більше"} />
                </Link>
            </div>
        </section>
    )
}
