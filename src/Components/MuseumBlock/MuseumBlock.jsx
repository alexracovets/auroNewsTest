import { useState, useEffect, useRef } from "react";

import MobileSlider from "./MobileSlider/MobileSlider";
import MuseumPopUp from "./MuseumPopUp/MuseumPopUp";
import dataFetch from "../../const/admin/dataFetch";
import Pagination from './Pagination/Pagination';
import MainSlider from "./MainSlider/MainSlider";
import SubSlider from "./SubSlider/SubSlider";
import Museums from './Museums/Museums';

import s from "./MuseumBlock.module.scss";

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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setSelectedItem(slides[currentSlide])
    }, [currentSlide, slides])

    const showInfo = (slide) => {
        slider3.current.slickGoTo(slide);
        setIsInfo(true)
    }

    useEffect(() => {
        dataFetch('museum-list', setSlides);
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
                    <MobileSlider isInfo={isInfo} slides={slides} slider3={slider3} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} setIsPopUpOpen={setIsPopUpOpen} />
                    <div className={s.circles}>
                        <div className={isInfo ? s.first + ' ' + s.active : s.first}></div>
                        <div className={isInfo ? s.second + ' ' + s.active : s.second}></div>
                        <div className={isInfo ? s.third + ' ' + s.active : s.third}></div>
                        <div className={isInfo ? s.fourd + ' ' + s.active : s.fourd}></div>
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
