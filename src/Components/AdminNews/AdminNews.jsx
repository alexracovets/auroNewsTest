import { useState, useEffect } from 'react';
import { firestore } from '../../firebase';

import PlusSvg from './PlusSvg/PlusSvg';
import PopUpEdit from './PopUpEdit/PopUpEdit';

import s from './AdminNews.module.scss';
import PopUpAdd from './PopUpAdd/PopUpAdd';
import Item from './Item/Item';

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
                setNews(newsArray.sort((a, b) => a.count - b.count));
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const deletNews = async (key) => {
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

    const findNewsByKey = (count) => {
        return news.find(item => item.count === count);
    };

    const changePosition = async (element, countMath) => {

        const currentCount = element.count;
        const currentNews = findNewsByKey(currentCount);
        const newCount = currentNews.count + countMath;
        const swapedNews = findNewsByKey(newCount);

      
        if (newCount < 0 || newCount > news.length-1) {
            return null;
        } 
        
        if (newCount >= 0) {
            try {
                // Оновлення даних в Firebase
                await dataRef.child(currentNews.key).update({ count: newCount });
                await dataRef.child(swapedNews.key).update({ count: currentCount });
                fetchData();
            } catch (error) {
                console.error('Помилка при оновленні даних в Firebase:', error);
            }
        }
    };

    const updateList = async () => {
        try {
            // Отримуємо дані з Firebase
            const snapshot = await dataRef.once('value');
            const data = snapshot.val();

            // Перебираємо всі елементи та оновлюємо їх count
            Object.keys(data).forEach(async (key) => {
                const currentCount = data[key].count;
                await dataRef.child(key).update({ count: currentCount + 1 });
            });
            await fetchData();
        } catch (error) {
            console.error('Помилка при оновленні списку:', error);
        }
    };

    useEffect(() => {
        if (news.length === 0) {
            fetchData();
        }
    }, [news]);
    console.log(news)
    return (
        <section>
            <div className={s.added} onClick={() => setPoUoAdded(true)}>
                <PlusSvg />
            </div>
            <div className={s.news}>
                <Item list={news} deletNews={deletNews} changePosition={changePosition} editNew={editNew} />
            </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetchData} setPoUoAdded={setPoUoAdded} changePosition={changePosition} updateList={updateList} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetchData} currentNews={currentNews} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
