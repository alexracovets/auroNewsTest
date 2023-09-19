import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import s from './CustomCursor.module.scss';
import { useNavigate } from 'react-router-dom';

export default function CustomCursor() {
    const wrapperRef = useRef(null);
    const cursorRef = useRef(null);
    const followerRef = useRef(null);


    const trackCursor = (e) => {
        gsap.to(cursorRef.current, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.2, ease: 'power4.out' });
        gsap.to(followerRef.current, { x: e.clientX - 23, y: e.clientY - 23, duration: 0.6, ease: 'power2.out' });
    };

    const handleMouseNormal = () => {
        gsap.to(followerRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' });
        gsap.to(cursorRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
        gsap.to(followerRef.current, { scale: 0.1, duration: 0.6, ease: 'power2.out' });
    };

    const handleMouseEnterBig = () => {
        gsap.to(followerRef.current, { scale: 1.5, duration: 0.6, ease: 'power2.out' });
        gsap.to(cursorRef.current, { scale: 0.1, duration: 0.4, ease: 'power2.out' });
    };


    useEffect(() => {
        document.addEventListener('mousemove', trackCursor);
        document.addEventListener('mouseenter', handleMouseNormal);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', trackCursor);
            document.removeEventListener('mouseenter', handleMouseNormal);
            document.removeEventListener('mouseleave', handleMouseLeave);
        }

    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const targetLink = document.querySelectorAll('a');
        const targetButton = document.querySelectorAll('button');
        const targetSlider = document.querySelectorAll('.slick-list');

        [...targetLink, ...targetButton, ...targetSlider].forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnterBig);
            element.addEventListener('mouseleave', handleMouseNormal);
        });

        return () => {
            [...targetLink, ...targetButton, ...targetSlider].forEach((element) => {
                element.removeEventListener('mouseenter', handleMouseEnterBig);
                element.removeEventListener('mouseleave', handleMouseNormal);
            });
        };
    }, [navigate]);

    return (
        <div ref={wrapperRef} className={s.cursorWrapper}>
            <div ref={cursorRef} className={s.cursor}></div>
            <div ref={followerRef} className={s.aura}></div>
        </div>
    );
}
