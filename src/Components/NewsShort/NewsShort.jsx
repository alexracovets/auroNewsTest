import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';

import firestoreRef from '../../const/firestoreRef';
import fetchData from '../../const/fetchData';
import checkLength from '../../const/checkLength';

import s from './NewsShort.module.scss';

export default function NewsShort() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const dataRef = firestoreRef('/data/news');
    const fetch = () => fetchData(dataRef, setItems, true);
    const goToPage = (item) => navigate(`/news/${item.key}`);

    const renderItems = () => items.map((item) => {
        return (
            <div className={s.item} key={item.key}>
                <div className={s.content}>
                    <div className={s.name}>
                        {checkLength(item.title, 57)}
                    </div>
                    <button className={s.content__button} onClick={() => goToPage(item)}>
                        <div className={s.button__text}>дізнатись більше</div>
                        <div className={s.button__arrow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                <path d="M7.13277 8L0.666092 1.45852C0.612851 1.40581 0.57076 1.34322 0.542253 1.27439C0.513747 1.20555 0.499392 1.13184 0.50002 1.05751C0.500647 0.983175 0.516244 0.909704 0.545908 0.841346C0.575572 0.772987 0.618714 0.711098 0.672838 0.65926C0.726962 0.607422 0.790992 0.566664 0.861224 0.539344C0.931456 0.512025 1.00649 0.498687 1.082 0.500102C1.1575 0.501517 1.23197 0.517657 1.30109 0.547588C1.37022 0.577519 1.43263 0.620646 1.48471 0.674475L8.33823 7.60798C8.44196 7.71293 8.5 7.85357 8.5 8C8.5 8.14643 8.44196 8.28707 8.33823 8.39202L1.48471 15.3255C1.43263 15.3794 1.37022 15.4225 1.30109 15.4524C1.23197 15.4823 1.1575 15.4985 1.082 15.4999C1.00649 15.5013 0.931456 15.488 0.861224 15.4607C0.790992 15.4333 0.726962 15.3926 0.672838 15.3407C0.618714 15.2889 0.575572 15.227 0.545908 15.1587C0.516244 15.0903 0.500647 15.0168 0.50002 14.9425C0.499392 14.8682 0.513747 14.7944 0.542253 14.7256C0.57076 14.6568 0.612851 14.5942 0.666092 14.5415L7.13277 8Z" fill="black" />
                            </svg>
                        </div>
                    </button>
                </div>
                <div className={s.info}>
                    <div className={s.date}>
                        {item.date}
                    </div>
                    <div className={s.likes}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            <path d="M30.69 9.85875C30.5236 9.20739 30.2667 8.58256 29.9269 8.0025C29.6004 7.39907 29.1831 6.8495 28.6894 6.37312C27.9736 5.65977 27.126 5.09237 26.1937 4.7025C24.3172 3.93234 22.2128 3.93234 20.3362 4.7025C19.4551 5.07548 18.6455 5.5989 17.9437 6.24937L17.8406 6.37312L16.5 7.71375L15.1594 6.37312L15.0562 6.24937C14.3545 5.5989 13.5449 5.07548 12.6637 4.7025C10.7872 3.93234 8.68279 3.93234 6.80624 4.7025C5.87395 5.09237 5.02635 5.65977 4.31061 6.37312C3.33167 7.32565 2.63869 8.53301 2.30999 9.85875C2.13512 10.532 2.05187 11.2257 2.06249 11.9212C2.06249 12.5771 2.14499 13.2289 2.30999 13.86C2.48289 14.4995 2.73219 15.1158 3.05249 15.6956C3.3984 16.2917 3.82142 16.8395 4.31061 17.325L16.5 29.5144L28.6894 17.325C29.1782 16.8465 29.5969 16.2979 29.9269 15.6956C30.5967 14.5512 30.9459 13.2473 30.9375 11.9212C30.9482 11.2257 30.8649 10.532 30.69 9.85875Z" fill="#FF0000" />
                        </svg>
                        <div className={s.count}>
                            {item.likes}
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    const renderItemsMobile = () => items.length > 0 && (
        <div className={s.item} key={items[0].key}>
            <div className={s.name}>
                {checkLength(items[0].title, 35)}
            </div>
            <div className={s.right}>
                <div className={s.date}>
                    {items[0].date}
                </div>
                <div className={s.likes}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                        <path d="M30.69 9.85875C30.5236 9.20739 30.2667 8.58256 29.9269 8.0025C29.6004 7.39907 29.1831 6.8495 28.6894 6.37312C27.9736 5.65977 27.126 5.09237 26.1937 4.7025C24.3172 3.93234 22.2128 3.93234 20.3362 4.7025C19.4551 5.07548 18.6455 5.5989 17.9437 6.24937L17.8406 6.37312L16.5 7.71375L15.1594 6.37312L15.0562 6.24937C14.3545 5.5989 13.5449 5.07548 12.6637 4.7025C10.7872 3.93234 8.68279 3.93234 6.80624 4.7025C5.87395 5.09237 5.02635 5.65977 4.31061 6.37312C3.33167 7.32565 2.63869 8.53301 2.30999 9.85875C2.13512 10.532 2.05187 11.2257 2.06249 11.9212C2.06249 12.5771 2.14499 13.2289 2.30999 13.86C2.48289 14.4995 2.73219 15.1158 3.05249 15.6956C3.3984 16.2917 3.82142 16.8395 4.31061 17.325L16.5 29.5144L28.6894 17.325C29.1782 16.8465 29.5969 16.2979 29.9269 15.6956C30.5967 14.5512 30.9459 13.2473 30.9375 11.9212C30.9482 11.2257 30.8649 10.532 30.69 9.85875Z" fill="#FF0000" />
                    </svg>
                    <div className={s.count}>
                        {items[0].likes}
                    </div>
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        (items.length === 0) && fetch();
    }, [items]);

    return (
        <section className={s.short_news}>
            <h3 className={s.title}>Новини</h3>
            <div className={s.list + ' ' + s.desktop}>
                <div className={s.left_wrapper}>
                    <div className={s.info}>
                        Цей сайт створений для того, щоб назавжди закарбувати у пам’яті <b>часи незламності.</b>
                    </div>
                    <div className={s.messages}>
                        <div className={s.item}>
                            <b>Зібрати</b> в одному місці всі нагороди та трофеї цієї війни, які ми отримали на знак подяки.
                        </div>
                        <div className={s.item}>
                            <b>Зберегти</b> неймовірні історії наших аврорівців, які пережили обстріли, окупацію, евакуацію, втрати, блекаути і стали ще сильнішими.
                        </div>
                    </div>
                    <div className={s.subMessage}>
                        Увіковічити пам’ять полеглих.
                    </div>
                    <div className={s.all}>
                        <Link to="/news" className={s.link}><CustomButton text="Читати Всі Новини" /></Link>
                    </div>
                </div>
                <div className={s.right_wrapper}>
                    {renderItems()}
                </div>
            </div>
            <div className={s.list + ' ' + s.mobile}>
                {renderItemsMobile()}
            </div>
            <div className={s.all + ' ' + s.mobile}>
                <Link to="/news" className={s.link}><CustomButton text="Всі Новини" /></Link>
            </div>
        </section>
    )
}
