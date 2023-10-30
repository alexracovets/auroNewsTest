import { useEffect, useState } from 'react';
import { firestore } from '../../firebase';

import CustomSlider from "../CustomSlider/CustomSlider";
import CustomButton from "../CustomButton/CustomButton";
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
    const [slides, setSlides] = useState([]);

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref('data/memorials');
            const snapshot = await dbRef.once('value');

            const data = snapshot.val();
            if (data) {
                const memorialsArray = Object.values(data);
                setMemorials(memorialsArray);
                setSlides(memorialsArray.reverse());
            }
        } catch (error) {
            console.error('Error fetching memorials:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const lastMemoIndex = currentPage * memoPerPage;
    const firstMemoIndex = lastMemoIndex - memoPerPage;
    const currentMemo = memorials.slice(firstMemoIndex, lastMemoIndex);

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

    const renderSlide = () => {
        return slides.map((memo, index) => (
            <div className={s.slide} key={index}>
                <div className={s.slider__wrapper}>
                    <div className={s.image} style={{ backgroundImage: `url(${memo.image})` }}></div>
                    <div className={s.name}>{memo.name}</div>
                    <div className={s.age}>{memo.age}</div>
                    <div className={s.position}>{memo.position}</div>
                    <div className={s.btn} onClick={() => moreInfo(memo)} >
                        <CustomButton text="додаткова інформація" noArrow white />
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            <section className={s.memo}>
                <div className={s.title}>
                    Наші Герої
                </div>
                <Memorials currentMemo={currentMemo} moreInfo={moreInfo} />
                <Pagination
                    memoPerPage={memoPerPage}
                    totalMemo={memorials.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className={s.slider__mobile}>
                    <CustomSlider renderSlide={renderSlide} isArrow={true} dark />
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
                                <defs>
                                    <clipPath id="clip0_361_47">
                                        <rect width="59" height="59" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={s.wrapper__top}>
                            <div className={s.img} style={{ backgroundImage: `url(${selectedItem.image})` }}>
                            </div>
                            <div className={s.info}>
                                <div className={s.name}>
                                    {selectedItem.name}
                                </div>
                                <div className={s.position}>
                                    {selectedItem.position}
                                </div>
                            </div>
                        </div>
                        <div className={s.wrapper_content}>
                            {
                                selectedItem.text && selectedItem.text.map((item) => {
                                    return (
                                        <p key={item.key} className={item.bold && s.bold}>
                                            {item}
                                        </p>
                                    )
                                })
                            }
                            <p>
                                Це віртуальна дошка пам&#39;яті аврорівців, які після 24 лютого 2022 року стали на захист країни. Вони віддали найдорожче - своє життя - заради нашого майбутнього у вільній і незалежній Україні. Ми вшановуємо наших полеглих колег, щоб завжди пам’ятати ціну перемоги.
                            </p>
                            <p>
                                Це віртуальна дошка пам&#39;яті аврорівців, які після 24 лютого 2022 року стали на захист країни. Вони віддали найдорожче - своє життя - заради нашого майбутнього у вільній і незалежній Україні. Ми вшановуємо наших полеглих колег, щоб завжди пам’ятати ціну перемоги.
                            </p>
                            <p className={s.bold}>
                                Це віртуальна дошка пам&#39;яті аврорівців, які після 24 лютого 2022 року стали на захист країни.
                            </p>
                        </div>
                    </div>
                )}
            </PopUp>
        </>

    )
}
