import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import MainSlider from "./MainSlider/MainSlider";
import SubSlider from "./SubSlider/SubSlider";

import dataFetch from "../../const/admin/dataFetch";

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

    const paginate = (newsNumber) => setCurrentPage(newsNumber)
    const clickItem = (toSlide) => slider.slickGoTo(toSlide) && setActiveSlide(toSlide);
    const goToPage = (item) => navigate(`/news/${item.key}`);
    const btnHandler = (item, toSlide) => goToPage(item) && clickItem(toSlide);

    useEffect(() => {
        dataFetch('news-list', setSlides);
    }, []);

    return (
        <>
            <MainSlider slides={slides} goToPage={goToPage} setActiveSlide={setActiveSlide} setSlider={setSlider} />
            <SubSlider slides={slides} activeSlide={activeSlide} btnHandler={btnHandler} currentNews={currentNews} newsPerPage={newsPerPage} paginate={paginate} currentPage={currentPage} />
        </>
    )
}
