import { Link, useLocation } from 'react-router-dom';
import logo from '/img/logo.svg';

import s from './Footer.module.scss';
import { useEffect, useState, useMemo } from 'react';

export default function Footer() {
    const [isYellow, setIsYellow] = useState(false);
    const location = useLocation();

    const pathNames = useMemo(() => [
        '/contacts',
        '/news/',
        '/museum'
    ], []);

    useEffect(() => {
        const checkConditions = () => {
            const isPathMatch = pathNames.some(path => location.pathname.includes(path));
            const isMobile = window.innerWidth <= 768;

            setIsYellow(isPathMatch && isMobile ? true : false);
        };
        checkConditions();

        window.addEventListener('resize', checkConditions);
        return () => {
            window.removeEventListener('resize', checkConditions);
        };
    }, [location.pathname, pathNames]);

    const links = [
        {
            name: 'Головна',
            path: '/',
        },
        {
            name: 'Новини',
            path: '/news',
        },
        {
            name: 'Наші Герої',
            path: '/memorial',
        },
        {
            name: 'Музей',
            path: '/museum',
        },
        {
            name: 'Контакти',
            path: '/contacts',
        }
    ]

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className={s.footer} style={{ backgroundColor: isYellow ? 'rgba(255, 221, 0, 0.15)' : '#fff' }}>
            <div className={s.menu}>
                <div className={s.logo}>
                    <Link to="/" onClick={scrollToTop}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path} onClick={scrollToTop}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    )
}
