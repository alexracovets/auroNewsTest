import { useState, useEffect } from 'react';
import { firestore } from '../../firebase';

import CrossSvg from './CrossSvg/CrossSvg';
import PlusSvg from './PlusSvg/PlusSvg';
import SettingSvg from './SettingSvg/SettingSvg';
import PopUpEdit from './PopUpEdit/PopUpEdit';

import s from './AdminNews.module.scss';
import PopUpAdd from './PopUpAdd/PopUpAdd';

export default function AdminNews() {
    const [news, setNews] = useState([]);
    const [popUpAdded, setPoUoAdded] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);

    const dataRef = firestore.ref('/data/news');

    const fetchData = async () => {
        try {
            const snapshot = await dataRef.once('value');

            const data = snapshot.val();
            if (data) {
                const newsArray = Object.values(data);
                setNews(newsArray.reverse());
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const deletNew = async (key) => {
        try {
            const snapshot = await dataRef.orderByChild('key').equalTo(key).once('value');
            const memos = snapshot.val();

            if (memos) {
                const memoKey = Object.keys(memos)[0];
                await dataRef.child(memoKey).remove();
            }
            setNews(prevNews => prevNews.filter(memo => memo.key !== key));

        } catch (error) {
            console.error('Помилка видалення меморіалу:', error);
        }
    };

    const editNew = (news) => {
        setCurrentNews(news);
        setPopUpEdit(true);
    }


    useEffect(() => {
        if (news.length === 0) {
            fetchData();
        }
    }, [news]);

    return (
        <section>
            <div className={s.added} onClick={() => setPoUoAdded(true)}>
                <PlusSvg />
            </div>
            <div className={s.news}>
                {news.map((news) => {
                    return (
                        <div className={s.memo} key={news.key}>
                            <div className={s.memo_content}>
                                <div className={s.memo__img} style={{ backgroundImage: `url(${news.image})` }}> </div>
                                <div className={s.memo__name}>{news.title}</div>
                            </div>
                            <div className={s.memo_setting}>
                                <div className={s.setting__edit} onClick={() => editNew(news)}><SettingSvg /></div>
                                <div className={s.setting__cross} onClick={() => deletNew(news.key)}><CrossSvg /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetchData} setPoUoAdded={setPoUoAdded} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetchData} currentNews={currentNews} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
