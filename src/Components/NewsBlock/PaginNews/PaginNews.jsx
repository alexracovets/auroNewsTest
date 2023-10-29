import PropTypes from 'prop-types';

import s from './PaginNews.module.scss';
import { useEffect, useState } from 'react';

PaginNews.propTypes = {
    currentNews: PropTypes.array.isRequired,
    activeSlide: PropTypes.number.isRequired,
    clickItem: PropTypes.func.isRequired,
};

export default function PaginNews({ currentNews, activeSlide, clickItem }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        setNews(currentNews)
    }, [currentNews])


    return (
        <>
            {
                news && news.map((item, index) => (
                    <div className={index === activeSlide ? s.newsItem + ' ' + s.active : s.newsItem} key={index} onClick={() => clickItem(index)}>
                        <div className={s.title}>
                            {item.title}
                        </div>
                        <div className={s.info}>
                            <div className={s.date}>
                                23.10.2023
                            </div>
                            <div className={s.like}>
                                <div className={s.like__wrapper}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                        <path d="M30.69 9.85875C30.5236 9.20739 30.2667 8.58256 29.9269 8.0025C29.6004 7.39907 29.1831 6.8495 28.6894 6.37312C27.9736 5.65977 27.126 5.09237 26.1937 4.7025C24.3172 3.93234 22.2128 3.93234 20.3362 4.7025C19.4551 5.07548 18.6455 5.5989 17.9437 6.24937L17.8406 6.37312L16.5 7.71375L15.1594 6.37312L15.0562 6.24937C14.3545 5.5989 13.5449 5.07548 12.6637 4.7025C10.7872 3.93234 8.68279 3.93234 6.80624 4.7025C5.87395 5.09237 5.02635 5.65977 4.31061 6.37312C3.33167 7.32565 2.63869 8.53301 2.30999 9.85875C2.13512 10.532 2.05187 11.2257 2.06249 11.9212C2.06249 12.5771 2.14499 13.2289 2.30999 13.86C2.48289 14.4995 2.73219 15.1158 3.05249 15.6956C3.3984 16.2917 3.82142 16.8395 4.31061 17.325L16.5 29.5144L28.6894 17.325C29.1782 16.8465 29.5969 16.2979 29.9269 15.6956C30.5967 14.5512 30.9459 13.2473 30.9375 11.9212C30.9482 11.2257 30.8649 10.532 30.69 9.85875Z" fill="#FF0000" />
                                    </svg>
                                    <div className={s.count}>
                                        {item.likes}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
