import { useState, useEffect } from 'react';
import { firestore } from '../../firebase';


import SettingSvg from './SettingSvg/SettingSvg';
import CrossSvg from './CrossSvg/CrossSvg';
import PopUpAdd from './PopUpAdd/PopUpAdd';
import PlusSvg from './PlusSvg/PlusSvg';
import PopUpEdit from './PopUpEdit/PopUpEdit';

import s from './AdminMemorial.module.scss';

export default function AdminMemorial() {
    const [memorials, setMemorials] = useState([]);
    const [popUpAdded, setPoUoAdded] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [memo, setMemo] = useState(null);

    const dataRef = firestore.ref('/data/memorials');

    const fetchData = async () => {
        try {
            const snapshot = await dataRef.once('value');

            const data = snapshot.val();
            if (data) {
                const memorialsArray = Object.values(data);
                setMemorials(memorialsArray.reverse());
            }
        } catch (error) {
            console.error('Error fetching memorials:', error);
        }
    };

    const deletMemo = async (key) => {
        try {
            // Отримати знайдений об'єкт за ключем
            const snapshot = await dataRef.orderByChild('key').equalTo(key).once('value');
            const memos = snapshot.val();

            // Якщо знайдено об'єкт, видалити його
            if (memos) {
                const memoKey = Object.keys(memos)[0];
                await dataRef.child(memoKey).remove();
            }

            setMemorials(prevMemorials => prevMemorials.filter(memo => memo.key !== key));
        } catch (error) {
            console.error('Помилка видалення меморіалу:', error);
        }
    };


    const editMemo = (memo) => {
        setMemo(memo);
        setPopUpEdit(true);
    }


    useEffect(() => {
        if (memorials.length === 0) {
            fetchData();
        }
    }, [memorials]);
    return (
        <section>
            <div className={s.added} onClick={() => setPoUoAdded(true)}>
                <PlusSvg />
            </div>
            <div className={s.memorials}>
                {memorials.map((memo) => {
                    return (
                        <div className={s.memo} key={memo.key}>
                            <div className={s.memo_content}>
                                <div className={s.memo__img} style={{ backgroundImage: `url(${memo.image})` }}> </div>
                                <div className={s.memo__name}>{memo.title}</div>
                            </div>
                            <div className={s.memo_setting}>
                                <div className={s.setting__edit} onClick={() => editMemo(memo)}> <SettingSvg /></div>
                                <div className={s.setting__cross} onClick={() => deletMemo(memo.key)}><CrossSvg /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetchData} setPoUoAdded={setPoUoAdded} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetchData} memo={memo} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
