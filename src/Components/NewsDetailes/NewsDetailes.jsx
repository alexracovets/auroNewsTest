import { useState, useEffect } from "react";
import { firestore } from '../../firebase';
import PropTypes from 'prop-types';

import heart from '/img/heart.svg'

import s from './NewsDetailes.module.scss';

NewsDetailes.propTypes = {
    id: PropTypes.string.isRequired
};

export default function NewsDetailes({ id }) {
    const [data, setData] = useState(null);
    const [likeActive, setLikeActive] = useState(true); 
    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('news')) || [];
        const findStorage = storageData.includes(id);
        setLikeActive(findStorage);
    }, []);

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref('data/news');
            const snapshot = await dbRef.once('value');
            const data = snapshot.val();

            if (data) {
                const findItem = Object.values(data).find(item => item.key === id);
                setData(findItem);
            }
        } catch (error) {
            console.error('Error fetching memorials:', error);
        }
    };

    const updateLikes = async (key) => {
        try {
            const dbRef = firestore.ref('data/news');
            const snapshot = await dbRef.once('value');
            const data = snapshot.val();

            if (data) {
                const findItem = Object.values(data).find(item => item.key === key);
                const storageData = JSON.parse(localStorage.getItem('news')) || [];
                const findStorageIndex = storageData.findIndex(item => item === key);

                if (findItem) {
                    if (findStorageIndex !== -1) {
                        storageData.splice(findStorageIndex, 1);
                        findItem.likes -= 1;
                    } else {
                        storageData.push(key);
                        findItem.likes += 1;
                    }
                    localStorage.setItem('news', JSON.stringify(storageData));
                    await dbRef.set(data);
                    setData(findItem);
                    const storageItem = JSON.parse(localStorage.getItem('news')) || [];
                    setLikeActive(storageItem.includes(key))
                }
            }
        } catch (error) {
            console.error('Помилка оновлення лайків:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {
                data &&
                <section className={s.NewsDetailes}>
                    <div className={s.news_wrapper}>
                        <h2 className={s.title}>{data.title}</h2>
                        <div className={s.news__image} style={{ backgroundImage: `url(${data.image})` }}></div>
                        {
                            data.text.map((item) => (
                                <div className={item.bold ? s.text + " " + s.bold : s.text} key={item.key}>
                                    {item.value}
                                </div>
                            ))
                        }
                        <div className={!likeActive ? s.likes : s.likes + ' ' + s.active} onClick={() => updateLikes(data.key)}>
                            <div className={s.heart}>
                                <img src={heart} alt="heart" />
                            </div>
                            <div className={s.count}>
                                {data.likes}
                            </div>
                        </div>
                    </div>
                </section >
            }
        </>
    )
}
