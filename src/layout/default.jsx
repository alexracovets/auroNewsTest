import { useState, useEffect, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import Main from '../Components/Main/Main';

const Layout = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isYellow, setIsYellow] = useState(false);
    const location = useLocation();
    const yellowPath = useMemo(() => ['/news/', '/museum', '/contacts'], []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const isMobile = windowWidth <= 768;
        const isPathYellow = yellowPath.some(path => location.pathname.includes(path));

        setIsYellow(isMobile && isPathYellow);
    }, [windowWidth, location.pathname, yellowPath]);

    return (
        <>
            <Header yellow={isYellow} />
            <Main />
            <Footer yellow={isYellow} wievPort={windowWidth} />
        </>
    )
}

export { Layout }
