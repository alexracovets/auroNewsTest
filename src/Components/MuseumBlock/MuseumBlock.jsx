import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { firestore } from "../../firebase";

import CustomButton from "../CustomButton/CustomButton";
import CustomArrow from "../CustomSlider/CustomArrow/CustomArrow";
import SubArrow from "./SubArrow/SubArrow"

import s from "./MuseumBlock.module.scss";
import PopUp from "../PopUp/PopUp";

export default function MuseumBlock() {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    const toSlide = (index) => {
        slider1.current.slickGoTo(index);
        slider2.current.slickGoTo(index)
    }

    const moreInfo = (info) => {
        if (!info) return setIsPopUpOpen(false);
        setSelectedItem(info);
        setIsPopUpOpen(true);
    }

    const closePopUp = () => {
        setSelectedItem(null);
        setIsPopUpOpen(false);
    }

    const renderSlide = () => {
        return slides.map((item) => (
            <div className={s.item} key={item.key}>
                <div
                    className={s.item__image}
                    style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className={s.item__content}>
                    <div className={s.description}>{item.title}</div>
                    <div className={s.item__texts}>
                        {item.text &&
                            item.text.map((text) => (
                                <div
                                    key={text.key}
                                    className={text.bold ? s.text + " " + s.bold : s.text}
                                >
                                    {text.value}
                                </div>
                            ))}
                    </div>
                    <div className={s.btn} onClick={() => { moreInfo(item) }}>
                        <CustomButton text={"детальніше"} />
                    </div>
                </div>
            </div>
        ));
    };

    const renderSubSlide = () => {
        return slides.map((item, index) => (
            <div className={s.item} key={item.key} onClick={() => toSlide(index)}>
                <div
                    className={
                        currentSlide === index ? s.item__image + " " + s.active : s.item__image
                    }
                    style={{ backgroundImage: `url(${item.image})` }}
                ></div>
            </div>
        ));
    };

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref("data/museums");
            const snapshot = await dbRef.once("value");

            const data = snapshot.val();

            if (data) {
                const museumsArray = Object.values(data);
                setSlides(museumsArray);
            }
        } catch (error) {
            console.error("Помилка завантаження:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const settingsMain = {
        arrows: true,
        dots: false,
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 300,
        swipeToSlide: true,
        prevArrow: <CustomArrow
            vector="prev"
            clickAction={() => {
                slider1.current.slickPrev();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider1}
        />,
        nextArrow: <CustomArrow
            vector="next"
            clickAction={() => {
                slider1.current.slickNext();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider1}
        />,
        afterChange: (index) => {
            setCurrentSlide(index);
        },
    };

    const settingsSub = {
        arrows: true,
        centerMode: true,
        lazyLoad: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true,
        speed: 300,
        prevArrow: <SubArrow
            vector="prev"
            clickAction={() => {
                slider2.current.slickPrev();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider2}
        />,
        nextArrow: <SubArrow
            vector="next"
            clickAction={() => {
                slider2.current.slickNext();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider2}
        />,
        afterChange: (index) => {
            setCurrentSlide(index);
        },
    };

    return (
        <>
            <section className={s.MuseumBlock}>
                <div className={s.title}>Музей</div>
                <div className={s.MuseumBlock_wrapper}>
                    <div className={s.slider}>
                        <Slider
                            asNavFor={slider2.current}
                            ref={slider1}
                            {...settingsMain}
                        >
                            {renderSlide()}
                        </Slider>
                    </div>
                    <div className={s.sub_slider}>
                        <Slider
                            asNavFor={slider1.current}
                            ref={slider2}
                            {...settingsSub}
                        >
                            {renderSubSlide()}
                        </Slider>
                    </div>
                </div>
            </section>
            <PopUp isPopUpOpen={isPopUpOpen}>
                {selectedItem && (
                    <div className={s.PopUp_wrapper}>
                        <div className={s.cross} onClick={() => { closePopUp() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                <path d="M25.8065 22.449L44.459 3.84639C44.8276 3.41711 45.0202 2.86492 44.9983 2.30017C44.9764 1.73541 44.7417 1.19969 44.341 0.800044C43.9403 0.400403 43.4031 0.166282 42.8368 0.144468C42.2706 0.122654 41.7169 0.314753 41.2865 0.682377L22.634 19.285L3.98147 0.659937C3.55779 0.237386 2.98315 0 2.38397 0C1.78479 0 1.21016 0.237386 0.786473 0.659937C0.362789 1.08249 0.124766 1.65559 0.124766 2.25316C0.124766 2.85074 0.362789 3.42384 0.786473 3.84639L19.4615 22.449L0.786473 41.0516C0.550939 41.2528 0.359643 41.5003 0.224591 41.7787C0.0895384 42.0571 0.0136455 42.3604 0.00167668 42.6694C-0.0102922 42.9784 0.0419201 43.2866 0.155038 43.5746C0.268156 43.8625 0.439737 44.1241 0.65901 44.3428C0.878283 44.5614 1.14051 44.7326 1.42925 44.8454C1.71798 44.9582 2.02698 45.0103 2.33684 44.9983C2.64671 44.9864 2.95076 44.9107 3.22991 44.776C3.50905 44.6413 3.75727 44.4505 3.95897 44.2156L22.634 25.613L41.2865 44.2156C41.7169 44.5833 42.2706 44.7754 42.8368 44.7535C43.4031 44.7317 43.9403 44.4976 44.341 44.098C44.7417 43.6983 44.9764 43.1626 44.9983 42.5978C45.0202 42.0331 44.8276 41.4809 44.459 41.0516L25.8065 22.449Z" fill="black" />
                            </svg>
                        </div>
                        <div className={s.image} style={{ backgroundImage: `url(${selectedItem.image})` }}>
                        </div>
                        <div className={s.title}>
                            {selectedItem.title}
                        </div>
                        <div className={s.texts}>
                            {selectedItem.text &&
                                selectedItem.text.map((text) => (
                                    <p key={text.key} className={text.bold ? s.text + " " + s.bold : s.text} >
                                        {text.value}
                                    </p>
                                ))}
                        </div>
                    </div>
                )}
            </PopUp>
        </>

    );
}
