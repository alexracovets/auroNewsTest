import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import firestoreRef from '../../const/firestoreRef';
import fetchData from '../../const/fetchData';

import MainSlider from "./MainSlider/MainSlider";
import SubSlider from "./SubSlider/SubSlider";

export default function NewsBlock() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeSlide, setActiveSlide] = useState(0);
    const [slider, setSlider] = useState(null);
    const [slides, setSlides] = useState([]);
    const [newsPerPage] = useState(3);
    const navigate = useNavigate();

    const lastMemoIndex = currentPage * newsPerPage;
    const firstMemoIndex = lastMemoIndex - newsPerPage;
    const currentNews = slides.slice(firstMemoIndex, lastMemoIndex);

    const dataRef = firestoreRef('/data/news');
    const paginate = (newsNumber) => setCurrentPage(newsNumber)
    const clickItem = (toSlide) => slider.slickGoTo(toSlide) && setActiveSlide(toSlide);
    const goToPage = (item) => navigate(`/news/${item.key}`);
    const btnHandler = (item, toSlide) => goToPage(item) && clickItem(toSlide);

    useEffect(() => {
        fetchData(dataRef, setSlides, true)
    }, [dataRef]);

    return (
        <>
            <MainSlider slides={slides} goToPage={goToPage} setActiveSlide={setActiveSlide} setSlider={setSlider} />
            <SubSlider slides={slides} activeSlide={activeSlide} btnHandler={btnHandler} currentNews={currentNews} newsPerPage={newsPerPage} paginate={paginate} currentPage={currentPage} />
        </>
    )
}
