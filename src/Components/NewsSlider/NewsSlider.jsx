import { useState, useEffect } from "react";
import { firestore } from '../../firebase';

import CustomSlider from "../CustomSlider/CustomSlider";
import CustomCircle from '../CustomCircle/CustomCircle';

import s from './NewsSlider.module.scss';

export default function NewsSlider() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [slider, setSlider] = useState(null);
    const [slides, setSlides] = useState([])

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref('data/news');
            const snapshot = await dbRef.once('value');

            const data = snapshot.val();

            if (data) {
                const memorialsArray = Object.values(data);
                setSlides(memorialsArray);
            }
        } catch (error) {
            console.error('Error fetching memorials:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        return slides.map((news, index) => (
            <div className={s.slide} key={index}>
                <div className={s.wrapperSlider}>
                    <h3>{news.title}</h3>
                    <div className={s.wrapper}>
                        <div className={s.image}>
                            <img src={news.image} alt="news" />
                        </div>
                        <div className={s.content}>
                            <div className={s.description}>
                                {news.text && news.text.map((item) => (
                                    <p key={item.key} className={item.bold ? s.bold : ''}>
                                        {item.value}
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
                <div className={s.title}>
                    Новини
                </div>
                <div className={s.slider}>
                    <CustomSlider renderSlide={renderSlide} afterChange={(index) => setActiveSlide(index)} setSlider={setSlider} />
                </div>
                <CustomCircle radius={circle1.radius} position={circle1.position} />
            </section>
            <section className={s.subNewsSlider}>
                <h3>Новини</h3>
                <div className={s.news}>
                    {slides.map((news, index) => (
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
