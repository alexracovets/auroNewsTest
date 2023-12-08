import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import dataItemLikes from "../../const/admin/dataItemLikes";
import heart from '/img/heart.svg'

import s from './NewsDetailes.module.scss';
import dataItemGet from "../../const/admin/dataItemGet";

NewsDetailes.propTypes = {
    id: PropTypes.string.isRequired
};

export default function NewsDetailes({ id }) {
    const [data, setData] = useState(null);
    const [likeActive, setLikeActive] = useState(true);
    const [isLoadImage, setIsLoadImage] = useState(false);

    const getData = (id) => {
        const storageData = JSON.parse(localStorage.getItem('news'));
        const findStorage = storageData.indexOf(id);
        setLikeActive(findStorage);
        dataItemGet(id, setData);
    }

    useEffect(() => {
        if (data) {
            const image = new Image();
            image.src = data.image;
            image.onload = () => {
                setIsLoadImage(true)
            };
        }

    }, [data]);

    useEffect(() => {
        getData(id)
    }, [id]);

    return (
        <>
            {
                data &&
                <section className={s.NewsDetailes}>
                    <div className={s.news_wrapper}>
                        <div className={s.back__wrapper}>
                            <Link to="/news" className={s.back}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none">
                                    <path d="M1.53813 9L8.81315 1.15023C8.87304 1.08697 8.9204 1.01186 8.95247 0.929264C8.98453 0.846663 9.00068 0.758204 8.99998 0.669007C8.99927 0.57981 8.98173 0.491645 8.94835 0.409615C8.91498 0.327585 8.86645 0.253318 8.80556 0.191112C8.74467 0.128906 8.67263 0.0799964 8.59362 0.0472132C8.51461 0.01443 8.43019 -0.00157572 8.34525 0.000122241C8.26031 0.0018202 8.17653 0.0211882 8.09877 0.0571053C8.021 0.0930224 7.95079 0.144776 7.8922 0.20937L0.181994 8.52957C0.0652943 8.65551 0 8.82429 0 9C0 9.17571 0.0652943 9.34449 0.181994 9.47043L7.8922 17.7906C7.95079 17.8552 8.021 17.907 8.09877 17.9429C8.17653 17.9788 8.26031 17.9982 8.34525 17.9999C8.43019 18.0016 8.51461 17.9856 8.59362 17.9528C8.67263 17.92 8.74467 17.8711 8.80556 17.8089C8.86645 17.7467 8.91498 17.6724 8.94835 17.5904C8.98173 17.5084 8.99927 17.4202 8.99998 17.331C9.00068 17.2418 8.98453 17.1533 8.95247 17.0707C8.9204 16.9881 8.87304 16.913 8.81315 16.8498L1.53813 9Z" fill="black" />
                                </svg>
                                <div className={s.text}> Назад </div>
                            </Link>
                        </div>
                        <div className={s.wrapper}>
                            <h2 className={s.title}>{data.title}</h2>
                            <div className={isLoadImage ? s.news__image + ' ' + s.active : s.news__image} style={{ backgroundImage: `url(${data.image})` }}></div>
                            <div className={s.texts}>
                                {
                                    data.text && data.text.map((item) => (
                                        <p className={item.bold ? s.text + " " + s.bold : s.text} key={item.key}>
                                            {item.value}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={s.bottom_wrapper}>
                            <div className={s.date}>
                                {data.date}
                            </div>
                            <div className={likeActive ? s.likes : s.likes + ' ' + s.active} onClick={() => dataItemLikes(id, getData)}>
                                <div className={s.heart}>
                                    <img src={heart} alt="heart" />
                                </div>
                                <div className={s.count}>
                                    {data.likes}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.circles}>
                        <div className={s.first}></div>
                        <div className={s.second}></div>
                        <div className={s.third}></div>
                        <div className={s.fourd}></div>
                        <div className={s.fived}></div>
                        <div className={s.sixed}></div>
                        <div className={s.sevened}></div>
                    </div>
                </section >
            }
        </>
    )
}
