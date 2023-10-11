import { useState, useEffect } from 'react';
import { firestore } from '../../firebase';

import SettingSvg from './SettingSvg/SettingSvg';
import CrossSvg from './CrossSvg/CrossSvg';
import PopUpAdd from './PopUpAdd/PopUpAdd';
import PlusSvg from './PlusSvg/PlusSvg';
import PopUpEdit from './PopUpEdit/PopUpEdit';


import s from './AdminMuseum.module.scss';

export default function AdminMuseum() {
    const [museums, setMuseums] = useState([]);
    const [popUpAdded, setPoUoAdded] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [muse, setMuse] = useState(null);

    const dataRef = firestore.ref('/data/museums');

    const fetchData = async () => {
        try {
            const snapshot = await dataRef.once('value');

            const data = snapshot.val();
            if (data) {
                const museumsArray = Object.values(data);
                setMuseums(museumsArray);
            }
        } catch (error) {
            console.error('Помилка завантаження:', error);
        }
    };

    const deletMuseum = async (key) => {
        try {
            // Отримати знайдений об'єкт за ключем
            const snapshot = await dataRef.orderByChild('key').equalTo(key).once('value');
            const muses = snapshot.val();

            // Якщо знайдено об'єкт, видалити його
            if (muses) {
                const museKey = Object.keys(muses)[0];
                await dataRef.child(museKey).remove();
            }

            setMuseums(prevMuseums => prevMuseums.filter(muse => muse.key !== key));
        } catch (error) {
            console.error('Помилка видалення:', error);
        }
    };


    const editMuseum = (muse) => {
        setMuse(muse);
        setPopUpEdit(true);
    }


    useEffect(() => {
        if (museums.length === 0) {
            fetchData();
        }
    }, [museums]);

    return (
        <section>
            <div className={s.added} onClick={() => setPoUoAdded(true)}>
                <PlusSvg />
            </div>
            <div className={s.museums}>
                {museums.map((muse) => {
                    return (
                        <div className={s.museum} key={muse.key}>
                            <div className={s.museum_content}>
                                <div className={s.museum__img} style={{ backgroundImage: `url(${muse.image})` }}> </div>
                                <div className={s.museum__name}>{muse.title}</div>
                            </div>
                            <div className={s.museum_setting}>
                                <div className={s.setting__edit} onClick={() => editMuseum(muse)}> <SettingSvg /></div>
                                <div className={s.setting__cross} onClick={() => deletMuseum(muse.key)}><CrossSvg /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetchData} setPoUoAdded={setPoUoAdded} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetchData} base={muse} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
