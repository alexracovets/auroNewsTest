import { useEffect, useState, useRef } from 'react';
import { firestore } from '../../firebase';
import Slider from "react-slick";

import CustomButton from "../CustomButton/CustomButton";
import DarkArrow from "../CustomSlider/DarkArrow/DarkArrow";
import Pagination from './Pagination/Pagination';
import Memorials from './Memorials/Memorials';
import PopUp from '../PopUp/PopUp';

import s from './MemorialBlock.module.scss';

export default function MemorialBlock() {

    const [memorials, setMemorials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [memoPerPage] = useState(3);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [value, setValue] = useState('');
    const sliderRef = useRef(null);
    const fitered = memorials.filter(memo => {
        return memo.title.toLowerCase().includes(value.toLowerCase())
    });

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
            <DarkArrow
                vector="prev"
                clickAction={() => {
                    sliderRef.current.slickPrev();
                }}
                slider={sliderRef}
            />
        ,
        nextArrow: <DarkArrow
            vector="next"
            clickAction={() => {
                sliderRef.current.slickNext()
            }}
            slider={sliderRef}
        />
    };

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref('data/memorial');
            const snapshot = await dbRef.once('value');

            const data = snapshot.val();
            if (data) {
                const memorialsArray = Object.values(data);
                setMemorials(memorialsArray);
            }
        } catch (error) {
            console.error('Error fetching memorials:', error);
        }
    };

    const lastMemoIndex = currentPage * memoPerPage;
    const firstMemoIndex = lastMemoIndex - memoPerPage;
    const currentMemo = fitered.slice(firstMemoIndex, lastMemoIndex);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const moreInfo = (memorial) => {
        if (!memorial) return setIsPopUpOpen(false);
        setSelectedItem(memorial);
        setIsPopUpOpen(true);
    }

    const closePopUp = () => {
        setSelectedItem(null);
        setIsPopUpOpen(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        sliderRef.current.slickGoTo(0);
    }, [fitered]);

    const renderSlide = () => {
        return (
            fitered.length > 0 ? (
                fitered.map((memo, index) => (
                    <div className={s.slide} key={index}>
                        <div className={s.trident}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="361" viewBox="0 0 230 361" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M115 0C106.087 9.54635 100.625 22.0717 100.625 35.7481C101.2 65.8766 105.081 95.9375 105.44 126.066C106.159 154.096 97.2467 180.433 86.3936 206.093C82.728 213.202 78.8467 220.175 74.8936 227.149L63.3936 224.915C52.9717 222.951 46.2155 213.473 48.2999 203.723C50.1686 195.125 58.1467 189.234 67.0592 189.167L71.228 189.573L61.8843 116.046C58.7936 83.2767 40.8967 54.5023 14.4469 35.7483C9.84687 32.5662 5.03124 29.6548 0 27.0144V288.488H64.1125C68.9282 312.998 83.2313 334.325 103.356 349.016C108.172 352.063 112.125 356.193 115 361C117.875 356.193 121.828 352.063 126.644 349.016C146.769 334.324 161.072 312.997 165.887 288.488H230V27.0144C224.969 29.6549 220.153 32.5662 215.553 35.7483C189.103 54.5024 171.206 83.2769 168.116 116.046L158.772 189.573L162.941 189.167C171.853 189.234 179.831 195.125 181.7 203.723C183.785 213.473 177.028 222.951 166.606 224.915L155.106 227.149C151.153 220.175 147.272 213.202 143.606 206.093C132.753 180.433 123.841 154.096 124.56 126.066C124.919 95.9375 128.8 65.8766 129.375 35.7481C129.375 22.0718 123.912 9.54637 115 0ZM19.1905 64.7257C31.6249 78.402 39.9623 95.4635 42.4061 114.285L50.0967 175.016C40.3217 179.62 32.8467 188.016 30.0436 198.171H19.1905V64.7257ZM210.809 64.7257V198.171H199.956C197.153 188.016 189.678 179.62 179.903 175.017L187.594 114.285C190.037 95.4636 198.375 78.402 210.809 64.7257ZM115 186.729C120.103 202.572 127.219 217.603 135.987 231.617C127.65 234.055 120.319 238.726 115 244.955C109.681 238.659 102.35 234.055 94.0124 231.617C102.781 217.603 109.897 202.572 115 186.729ZM19.1905 216.249H30.0436C33.4936 228.706 43.7717 238.591 56.9249 241.976L66.1249 244.007C63.6811 252.403 62.3155 261.272 62.3155 270.412H19.1907L19.1905 216.249ZM199.956 216.249H210.809V270.412H167.684C167.684 261.272 166.319 252.403 163.875 244.007L173.075 241.976C186.156 238.591 196.506 228.706 199.956 216.249ZM84.8842 248.138C96.456 249.695 105.44 259.038 105.44 270.412H81.506C81.506 262.694 82.7279 255.247 84.8842 248.138ZM145.115 248.138C147.272 255.247 148.493 262.694 148.493 270.412H124.559C124.559 259.038 133.543 249.695 145.115 248.138ZM83.6621 288.489H105.44V326.472C94.8746 316.045 87.1839 302.978 83.6621 288.489ZM124.559 288.489H146.337C142.815 302.978 135.125 316.045 124.559 326.472V288.489Z" fill="white" fillOpacity="0.25" />
                            </svg>
                        </div>
                        <div className={s.slider__wrapper}>
                            <div className={s.image} style={{ backgroundImage: `url(${memo.image})` }}></div>
                            <div className={s.name}>{memo.title}</div>
                            <div className={s.age}>{memo.age}</div>
                            <div className={s.position}>{memo.position}</div>
                            <div className={s.btn} onClick={() => moreInfo(memo)} >
                                <CustomButton text="додаткова інформація" noArrow white />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={s.slide + ' ' + s.noResault}>
                    Пошук не дав результатів
                </div >
            )
        );
    };

    return (
        <>
            <section className={s.memo}>
                <div className={s.title}>
                    Наші Герої
                </div>
                <form className={s.form}>
                    <input
                        type="text"
                        placeholder='Пошук за ПІП'
                        className={s.search}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </form>
                <Memorials currentMemo={currentMemo} moreInfo={moreInfo} />
                <Pagination
                    memoPerPage={memoPerPage}
                    totalMemo={memorials.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className={s.slider__mobile}>
                    <Slider ref={sliderRef} {...settings} >
                        {renderSlide()}
                    </Slider>
                </div>
            </section>
            <PopUp isPopUpOpen={isPopUpOpen}>
                {selectedItem && (
                    <div className={s.PopUp_wrapper}>
                        <div className={s.cross} onClick={() => closePopUp()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
                                <g clipPath="url(#clip0_361_47)">
                                    <path d="M31.811 29.5L45.3974 15.9136C45.6659 15.6001 45.8062 15.1968 45.7902 14.7843C45.7743 14.3718 45.6033 13.9806 45.3114 13.6887C45.0196 13.3968 44.6283 13.2258 44.2158 13.2099C43.8033 13.194 43.4001 13.3342 43.0865 13.6027L29.5001 27.1891L15.9138 13.5864C15.6051 13.2777 15.1866 13.1044 14.7501 13.1044C14.3137 13.1044 13.8951 13.2777 13.5865 13.5864C13.2779 13.895 13.1046 14.3135 13.1046 14.75C13.1046 15.1864 13.2779 15.605 13.5865 15.9136L27.1893 29.5L13.5865 43.0864C13.415 43.2333 13.2756 43.4141 13.1773 43.6174C13.0789 43.8207 13.0236 44.0422 13.0149 44.2679C13.0062 44.4936 13.0442 44.7187 13.1266 44.929C13.209 45.1393 13.334 45.3303 13.4937 45.49C13.6534 45.6497 13.8444 45.7747 14.0547 45.8571C14.265 45.9395 14.4901 45.9775 14.7158 45.9688C14.9415 45.9601 15.163 45.9048 15.3663 45.8065C15.5696 45.7081 15.7504 45.5688 15.8974 45.3972L29.5001 31.8108L43.0865 45.3972C43.4001 45.6657 43.8033 45.806 44.2158 45.79C44.6283 45.7741 45.0196 45.6031 45.3114 45.3113C45.6033 45.0194 45.7743 44.6281 45.7902 44.2156C45.8062 43.8032 45.6659 43.3999 45.3974 43.0864L31.811 29.5Z" fill="white" />
                                </g>
                                <defs><clipPath id="clip0_361_47"><rect width="59" height="59" fill="white" /></clipPath></defs>
                            </svg>
                        </div>
                        <div className={s.wrapper__top}>
                            <div className={s.img} style={{ backgroundImage: `url(${selectedItem.image})` }}>
                            </div>
                            <div className={s.info}>
                                <div className={s.name}>{selectedItem.title}</div>
                                <div className={s.position}>{selectedItem.position}</div>
                            </div>
                        </div>
                        <div className={s.wrapper_content}>
                            {selectedItem.text && selectedItem.text.map((item) => (
                                <p key={item.key} className={item.bold ? s.bold : null}>{item.value}</p>
                            ))}
                        </div>
                    </div>
                )}
            </PopUp >
        </>

    )
}
