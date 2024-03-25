import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import checkLength from '../../../../const/checkLength';

import s from '../../NewsBlock.module.scss';

Slide.propTypes = {
    news: PropTypes.object,
    goToPage: PropTypes.func
};

export default function Slide({ news, goToPage }) {
    const [isLoadImage, setIsLoadImage] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = import.meta.env.VITE_SERVER_URL === '' ? news.image : import.meta.env.VITE_SERVER_URL + `/${news.image}`;
        image.onload = () => {
            setIsLoadImage(true)
        };
    }, [news.image]);

    return (
        <div className={s.slide}>
            <div className={s.wrapperSlider}>
                <h3 className={s.title + ' ' + s.desktop}>{checkLength(news.title, 50)} </h3>
                <div className={s.wrapper}>
                    <div className={isLoadImage ? s.image + ' ' + s.active : s.image} style={{ backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}${news.image})` }}></div>
                    <div className={s.date + ' ' + s.mobile}>{news.date}</div>
                    <h3 className={s.title + ' ' + s.mobile}>{checkLength(news.title, 30)}</h3>
                    <div className={s.content}>
                        <div className={s.description}>
                            {news.text && news.text[0] && <p className={news.text[0].bold && s.bold}>{checkLength(news.text[0].value, 192)}</p>}
                            {news.text && news.text[1] && <p className={news.text[1].bold && s.bold}>{checkLength(news.text[1].value, 192)}</p>}
                        </div>
                        <button className={s.read} onClick={() => goToPage(news)}>читати</button>
                    </div>
                </div>
                <div className={s.date + ' ' + s.desktop}>
                    {news.date}
                </div>
                <div className={s.like}>
                    <div className={s.like__wrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            <path d="M30.69 9.85875C30.5236 9.20739 30.2667 8.58256 29.9269 8.0025C29.6004 7.39907 29.1831 6.8495 28.6894 6.37312C27.9736 5.65977 27.126 5.09237 26.1937 4.7025C24.3172 3.93234 22.2128 3.93234 20.3362 4.7025C19.4551 5.07548 18.6455 5.5989 17.9437 6.24937L17.8406 6.37312L16.5 7.71375L15.1594 6.37312L15.0562 6.24937C14.3545 5.5989 13.5449 5.07548 12.6637 4.7025C10.7872 3.93234 8.68279 3.93234 6.80624 4.7025C5.87395 5.09237 5.02635 5.65977 4.31061 6.37312C3.33167 7.32565 2.63869 8.53301 2.30999 9.85875C2.13512 10.532 2.05187 11.2257 2.06249 11.9212C2.06249 12.5771 2.14499 13.2289 2.30999 13.86C2.48289 14.4995 2.73219 15.1158 3.05249 15.6956C3.3984 16.2917 3.82142 16.8395 4.31061 17.325L16.5 29.5144L28.6894 17.325C29.1782 16.8465 29.5969 16.2979 29.9269 15.6956C30.5967 14.5512 30.9459 13.2473 30.9375 11.9212C30.9482 11.2257 30.8649 10.532 30.69 9.85875Z" fill="#FF0000" />
                        </svg>
                        <div className={s.count}>
                            {news.likes}
                        </div>
                    </div>
                </div>
                <div className={s.circles}>
                    <div className={s.first}></div>
                    <div className={s.second}></div>
                    <div className={s.third}></div>
                    <div className={s.fourd}></div>
                </div>
            </div>
        </div>
    )
}
