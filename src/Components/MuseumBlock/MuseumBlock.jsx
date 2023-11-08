import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { firestore } from "../../firebase";

import CustomArrow from "../CustomSlider/CustomArrow/CustomArrow";
import CustomButton from "../CustomButton/CustomButton";
import Pagination from './Pagination/Pagination';
import Museums from './Museums/Museums';

import s from "./MuseumBlock.module.scss";
import MuseumPopUp from "./MuseumPopUp/MuseumPopUp";
import MainSlider from "./MainSlider/MainSlider";
import SubSlider from "./SubSlider/SubSlider";

export default function MuseumBlock() {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isInfo, setIsInfo] = useState(false);
    const [memoPerPage] = useState(16);
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const slider3 = useRef(null);

    const lastMemoIndex = currentPage * memoPerPage;
    const firstMemoIndex = lastMemoIndex - memoPerPage;
    const currentMemo = slides.slice(firstMemoIndex, lastMemoIndex);

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref("data/museum");
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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setSelectedItem(slides[currentSlide])
    }, [currentSlide, slides])

    const checkLength = (number, string) => {
        if (string.length <= number) {
            return string
        } else {
            const truncatedString = string.substring(0, (+number - 3)) + '...';
            return truncatedString
        }
    };
    const renderMobileSlide = () => {
        return slides.map((item) => (
            <div className={s.item} key={item.key}>
                <div
                    className={s.item__image}
                    style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className={s.item__content}>
                    <div className={s.description}>{item.title}</div>
                    <div className={s.item__texts}>
                        {item.text && (item.text[0] && <p>{checkLength(90, item.text[0].value)}</p>)}
                        {item.text && (item.text[1] && <p>{checkLength(90, item.text[1].value)}</p>)}
                    </div>
                    <div className={s.btn} onClick={() => { setIsPopUpOpen(true) }}>
                        <CustomButton text={"детальніше"} />
                    </div>
                </div>
            </div>
        ));
    };

    const showInfo = (slide) => {
        slider3.current.slickGoTo(slide);
        setIsInfo(true)
    }

    const settingsMobile = {
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
                slider3.current.slickPrev();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider3}
        />,
        nextArrow: <CustomArrow
            vector="next"
            clickAction={() => {
                slider3.current.slickNext();
            }}
            currentSlide={Number(currentSlide)}
            slider={slider3}
        />,
        afterChange: (index) => {
            setCurrentSlide(index);
        },
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className={s.MuseumBlock}>
                <div className={s.title}>Музей</div>
                <div className={s.MuseumBlock_wrapper + ' ' + s.desktop}>
                    <MainSlider slides={slides} setIsPopUpOpen={setIsPopUpOpen} slider1={slider1} slider2={slider2} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
                    <SubSlider slides={slides} slider1={slider1} slider2={slider2} currentSlide={currentSlide} />
                </div>
                <div className={s.MuseumBlock_wrapper + ' ' + s.mobile}>
                    <div className={isInfo ? s.back + ' ' + s.active : s.back} onClick={isInfo ? () => setIsInfo(false) : null}>
                        <div className={s.text}>
                            Всі експонати
                        </div>
                    </div>
                    <div className={!isInfo ? s.pagination + ' ' + s.active : s.pagination}>
                        <Museums currentMemo={currentMemo} showInfo={showInfo} currentSlide={currentSlide} />
                        <Pagination
                            memoPerPage={memoPerPage}
                            totalMemo={slides.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                    <div className={isInfo ? s.short__info + ' ' + s.active : s.short__info}>
                        <div className={s.mobile_slider}>
                            <Slider
                                ref={slider3}
                                {...settingsMobile}
                            >
                                {renderMobileSlide()}
                            </Slider>
                        </div>
                    </div>
                    <div className={s.circles}>
                        <div className={s.first}></div>
                        <div className={s.second}></div>
                        <div className={s.third}></div>
                        <div className={s.fourd}></div>
                    </div>
                </div>
                <div className={s.circles}>
                    <div className={s.first}></div>
                </div>
            </section >
            <MuseumPopUp isPopUpOpen={isPopUpOpen} selectedItem={selectedItem} closePopUp={() => setIsPopUpOpen(false)} />
        </>
    );
}
