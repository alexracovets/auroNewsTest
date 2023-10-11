import { useState, useEffect } from "react";
import { firestore } from '../../firebase';

import s from './MuseumBlock.module.scss';
import CustomSlider from '../CustomSlider/CustomSlider';

export default function MuseumBlock() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [slider, setSlider] = useState(null);
    const [slides, setSlides] = useState([]);

    const clickItem = (toSlide) => {
        slider.slickGoTo(toSlide);
        setActiveSlide(toSlide);
    }

    const renderSlide = () => {
        return slides.map((item) => (
            <div className={s.item} key={item.key}>
                <div className={s.item__image}>
                    <img src={item.image} alt={item.title} />
                </div>
                <div className={s.item__content}>
                    <div className={s.description}>
                        {item.title}
                    </div>
                    {item.text && item.text.map((text) => (
                        <div key={text.key} className={text.bold ? s.text + " " + s.bold : s.text}>
                            {text.value}
                        </div>
                    ))
                    }
                </div>
            </div>
        ));
    };

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref('data/museums');
            const snapshot = await dbRef.once('value');

            const data = snapshot.val();

            if (data) {
                const museumsArray = Object.values(data);
                setSlides(museumsArray);
            }
        } catch (error) {
            console.error('Помилка завантаження:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className={s.MuseumBlock}>
            <div className={s.title}>
                Музей
            </div>
            <div className={s.MuseumBlock_wrapper}>
                <div className={s.descriptions}>
                    {slides.map((item, index) => (
                        <button className={index === activeSlide ? s.description + ' ' + s.active : s.description} key={index} onClick={() => clickItem(index)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div className={s.slider}>
                    <CustomSlider renderSlide={renderSlide} afterChange={(index) => setActiveSlide(index)} setSlider={setSlider} isArrow={false} />
                </div>
            </div>
        </section >
    )
}
