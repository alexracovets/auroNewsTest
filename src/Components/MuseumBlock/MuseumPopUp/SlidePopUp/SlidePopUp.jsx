import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

SlidePopUp.propTypes = {
    selectedItem: PropTypes.object,
    closePopUp: PropTypes.func
};

import s from "../MuseumPopUp.module.scss";

export default function SlidePopUp({ selectedItem, closePopUp }) {
    const imageItem = useRef(null);
    const [isLoadImage, setIsLoadImage] = useState(false);
    const [isFullImage, setIsFullImage] = useState(false);
    const [isZoom, setIsZoom] = useState(false);
    const [waitingClick, setWaitingClick] = useState(null);
    const [lastClick, setLastClick] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [imageSize, setImageSize] = useState({
        width: 0,
        height: 0
    });
    const [isBigest, setIsBigest] = useState(false);
    const [isHigher, setIsHigher] = useState(false);

    const doubleClick = (e) => {
        if (lastClick && e.timeStamp - lastClick < 250 && waitingClick) {
            setLastClick(0);
            clearTimeout(waitingClick);
            setWaitingClick(null);
            setIsZoom(!isZoom);
        } else {
            setLastClick(e.timeStamp);
            setWaitingClick(setTimeout(() => {
                setWaitingClick(null);
            }, 251));
        }
    }

    const closeFullImage = () => {
        setIsFullImage(false);
        setIsZoom(false);
    }

    const updateImageSize = () => {
        if (imageItem.current) {
            const { width, height } = imageItem.current.getBoundingClientRect();
            setImageSize({
                width: width,
                height: height
            })
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (selectedItem) {
            const image = new Image();
            image.src = import.meta.env.VITE_SERVER_URL === '' ? selectedItem.image : import.meta.env.VITE_SERVER_URL + `/${selectedItem.image}`;
            image.onload = () => {
                setIsLoadImage(true);
                updateImageSize();
            };
        }
    }, [selectedItem]);

    useEffect(() => {
        updateImageSize()
    }, [windowSize, isZoom])

    useEffect(() => {
        setIsBigest(imageSize.width > windowSize.width);
        setIsHigher(imageSize.height > windowSize.height)
    }, [imageSize, windowSize])

    return (
        <>
            <div className={isFullImage ? s.PopUp_wrapper + ' ' + s.hide : s.PopUp_wrapper}>
                <div className={s.cross} onClick={() => { closePopUp() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
                        <g clipPath="url(#clip0_361_47)">
                            <path d="M31.811 29.5L45.3974 15.9136C45.6659 15.6001 45.8062 15.1968 45.7902 14.7843C45.7743 14.3718 45.6033 13.9806 45.3114 13.6887C45.0196 13.3968 44.6283 13.2258 44.2158 13.2099C43.8033 13.194 43.4001 13.3342 43.0865 13.6027L29.5001 27.1891L15.9138 13.5864C15.6051 13.2777 15.1866 13.1044 14.7501 13.1044C14.3137 13.1044 13.8951 13.2777 13.5865 13.5864C13.2779 13.895 13.1046 14.3135 13.1046 14.75C13.1046 15.1864 13.2779 15.605 13.5865 15.9136L27.1893 29.5L13.5865 43.0864C13.415 43.2333 13.2756 43.4141 13.1773 43.6174C13.0789 43.8207 13.0236 44.0422 13.0149 44.2679C13.0062 44.4936 13.0442 44.7187 13.1266 44.929C13.209 45.1393 13.334 45.3303 13.4937 45.49C13.6534 45.6497 13.8444 45.7747 14.0547 45.8571C14.265 45.9395 14.4901 45.9775 14.7158 45.9688C14.9415 45.9601 15.163 45.9048 15.3663 45.8065C15.5696 45.7081 15.7504 45.5688 15.8974 45.3972L29.5001 31.8108L43.0865 45.3972C43.4001 45.6657 43.8033 45.806 44.2158 45.79C44.6283 45.7741 45.0196 45.6031 45.3114 45.3113C45.6033 45.0194 45.7743 44.6281 45.7902 44.2156C45.8062 43.8032 45.6659 43.3999 45.3974 43.0864L31.811 29.5Z" fill="black" />
                        </g>
                        <defs><clipPath id="clip0_361_47"><rect width="59" height="59" fill="white" /></clipPath></defs>
                    </svg>
                </div>
                <div
                    className={isLoadImage ? s.image + ' ' + s.active : s.image}
                    style={{ backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}${selectedItem.image})` }}
                    onClick={() => setIsFullImage(true)}
                >
                </div>
                <div className={s.title}>
                    {selectedItem.title}
                </div>
                {selectedItem.text &&
                    selectedItem.text.map((text) => (
                        <p key={text.key} className={text.bold ? s.text + ' ' + s.bold + ' ' + s.desktop : s.text + ' ' + s.desktop} >
                            {text.value}
                        </p>
                    ))}
                <div className={s.texts + ' ' + s.mobile}>
                    {selectedItem.text &&
                        selectedItem.text.map((text) => (
                            <p key={text.key} className={text.bold ? s.text + " " + s.bold : s.text} >
                                {text.value}
                            </p>
                        ))}
                </div>
            </div >
            {isFullImage && (
                <div className={s.modal}>
                    <span className={s.close} onClick={() => closeFullImage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
                            <g clipPath="url(#clip0_361_47)">
                                <path d="M31.811 29.5L45.3974 15.9136C45.6659 15.6001 45.8062 15.1968 45.7902 14.7843C45.7743 14.3718 45.6033 13.9806 45.3114 13.6887C45.0196 13.3968 44.6283 13.2258 44.2158 13.2099C43.8033 13.194 43.4001 13.3342 43.0865 13.6027L29.5001 27.1891L15.9138 13.5864C15.6051 13.2777 15.1866 13.1044 14.7501 13.1044C14.3137 13.1044 13.8951 13.2777 13.5865 13.5864C13.2779 13.895 13.1046 14.3135 13.1046 14.75C13.1046 15.1864 13.2779 15.605 13.5865 15.9136L27.1893 29.5L13.5865 43.0864C13.415 43.2333 13.2756 43.4141 13.1773 43.6174C13.0789 43.8207 13.0236 44.0422 13.0149 44.2679C13.0062 44.4936 13.0442 44.7187 13.1266 44.929C13.209 45.1393 13.334 45.3303 13.4937 45.49C13.6534 45.6497 13.8444 45.7747 14.0547 45.8571C14.265 45.9395 14.4901 45.9775 14.7158 45.9688C14.9415 45.9601 15.163 45.9048 15.3663 45.8065C15.5696 45.7081 15.7504 45.5688 15.8974 45.3972L29.5001 31.8108L43.0865 45.3972C43.4001 45.6657 43.8033 45.806 44.2158 45.79C44.6283 45.7741 45.0196 45.6031 45.3114 45.3113C45.6033 45.0194 45.7743 44.6281 45.7902 44.2156C45.8062 43.8032 45.6659 43.3999 45.3974 43.0864L31.811 29.5Z" fill="black" />
                            </g>
                            <defs><clipPath id="clip0_361_47"><rect width="59" height="59" fill="white" /></clipPath></defs>
                        </svg>
                    </span>
                    <div className={s.modalContent}
                        style={{ justifyContent: isZoom && isBigest ? 'flex-start' : 'center', alignItems: isZoom && isHigher ? 'flex-start' : 'center' }}
                    >
                        <img ref={imageItem}
                            src={import.meta.env.VITE_SERVER_URL === '' ? selectedItem.image : import.meta.env.VITE_SERVER_URL + `/${selectedItem.image}`}
                            alt="Full Screen Image"
                            className={isZoom ? s.zoom_out : s.zoom_in}
                            style={{
                                transform: isZoom ?
                                    `scale(2)
                                    ${isBigest ? 'translateX(25%)' : 'translateX(0%)'}
                                    ${isHigher ? 'translateY(25%)' : 'translateY(0%)'}` :
                                    'scale(1) translateX(0%) translateY(0%)'
                            }}
                        />
                    </div>
                </div>
            )
            }
        </>
    );
}
