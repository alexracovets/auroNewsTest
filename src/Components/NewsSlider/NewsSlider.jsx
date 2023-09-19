import { useState } from "react";
import CustomSlider from "../CustomSlider/CustomSlider";
import CustomCircle from '../CustomCircle/CustomCircle';

import s from './NewsSlider.module.scss';

export default function NewsSlider() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [slider, setSlider] = useState(null);

    const museumList = [
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
    ]

    const circle1 = {
        radius: "15.625rem",
        position: {
            top: '-2.8125rem',
            bottom: 'auto',
            left: 'auto',
            right: '-2.4375rem'
        }
    }
    const circle2 = {
        radius: "15.625rem",
        position: {
            top: '-7.8125rem',
            bottom: 'auto',
            left: '-7.8125rem',
            right: 'auto'
        }
    }

    const clickItem = (toSlide) => {
        slider.slickGoTo(toSlide);
        setActiveSlide(toSlide);
    }

    const renderSlide = () => {
        return museumList.map((news, index) => (
            <div className={s.slide} key={index}>
                <div className={s.wrapperSlider}>
                    <h3>{news.title}</h3>
                    <div className={s.wrapper}>
                        <div className={s.image}>
                            <img src={news.photo} alt="news" />
                        </div>
                        <div className={s.content}>
                            <div className={s.description}>
                                {news.description.map((item, index) => (
                                    <p key={index}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                            <button className={s.read}>читати</button>
                        </div>
                    </div>
                </div>

            </div>
        ));
    };

    return (
        <>
            <section className={s.newsSlider}>
                <div className={s.slider}>
                    <CustomSlider renderSlide={renderSlide} afterChange={(index) => setActiveSlide(index)} setSlider={setSlider} />
                </div>
                <CustomCircle radius={circle1.radius} position={circle1.position} />
            </section>
            <section className={s.subNewsSlider}>
                <h3>Новини</h3>
                <div className={s.news}>
                    {museumList.map((news, index) => (
                        <button className={`${s.newsItem} ${index === activeSlide ? s.active : ""}`} key={index} onClick={() => clickItem(index)}>
                            {news.title}
                        </button>
                    ))}
                </div>
                <CustomCircle radius={circle2.radius} position={circle2.position} />
            </section >
        </>
    )
}
