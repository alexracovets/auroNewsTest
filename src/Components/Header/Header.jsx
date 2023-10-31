import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import handleScroll from '../../const/handleScroll.js'

import s from './Header.module.scss';
import logo from '/img/logo.svg';

export default function Header() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);

    useEffect(() => {
        setIsScrolled(false);
        scrollToTop()
    }, [location.pathname]);

    useEffect(() => {
        const scrollHandler = () => handleScroll(setIsScrolled);

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

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
        <>
            <header className={isScrolled ? s.disable : null} >
                <div className={s.logo}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => isActive ? s.active : undefined}
                                    exact="true"
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className={!isPopUp ? s.burger : s.burger + ' ' + s.disable} onClick={() => setIsPopUp(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M32 29H4C3.73478 29 3.48043 28.8946 3.29289 28.7071C3.10536 28.5196 3 28.2652 3 28C3 27.7348 3.10536 27.4804 3.29289 27.2929C3.48043 27.1054 3.73478 27 4 27H32C32.2652 27 32.5196 27.1054 32.7071 27.2929C32.8946 27.4804 33 27.7348 33 28C33 28.2652 32.8946 28.5196 32.7071 28.7071C32.5196 28.8946 32.2652 29 32 29Z" fill="black" />
                        <path d="M32 19H4C3.73478 19 3.48043 18.8946 3.29289 18.7071C3.10536 18.5196 3 18.2652 3 18C3 17.7348 3.10536 17.4804 3.29289 17.2929C3.48043 17.1054 3.73478 17 4 17H32C32.2652 17 32.5196 17.1054 32.7071 17.2929C32.8946 17.4804 33 17.7348 33 18C33 18.2652 32.8946 18.5196 32.7071 18.7071C32.5196 18.8946 32.2652 19 32 19Z" fill="black" />
                        <path d="M32 9H4C3.73478 9 3.48043 8.89464 3.29289 8.70711C3.10536 8.51957 3 8.26522 3 8C3 7.73478 3.10536 7.48043 3.29289 7.29289C3.48043 7.10536 3.73478 7 4 7H32C32.2652 7 32.5196 7.10536 32.7071 7.29289C32.8946 7.48043 33 7.73478 33 8C33 8.26522 32.8946 8.51957 32.7071 8.70711C32.5196 8.89464 32.2652 9 32 9Z" fill="black" />
                    </svg>
                </div>
            </ header>
            <div className={isPopUp ? s.popMenu + ' ' + s.active : s.popMenu}>
                <div className={isPopUp ? s.cross : s.cross + ' ' + s.disable} onClick={() => setIsPopUp(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path d="M13.19 11.4739L22.7235 1.96593C22.9119 1.74653 23.0103 1.46429 22.9991 1.17564C22.988 0.886988 22.868 0.613172 22.6632 0.408911C22.4584 0.204651 22.1838 0.0849886 21.8944 0.0738392C21.605 0.0626898 21.322 0.160874 21.102 0.34877L11.5685 9.85677L2.03498 0.337301C1.81843 0.121331 1.52472 0 1.21847 0C0.912228 0 0.618524 0.121331 0.401975 0.337301C0.185426 0.553271 0.0637695 0.846189 0.0637695 1.15162C0.0637695 1.45705 0.185426 1.74996 0.401975 1.96593L9.94697 11.4739L0.401975 20.9819C0.281591 21.0848 0.183818 21.2113 0.114791 21.3536C0.0457641 21.4959 0.00697439 21.6509 0.00085697 21.8088C-0.00526045 21.9668 0.0214258 22.1243 0.0792416 22.2715C0.137057 22.4186 0.224754 22.5523 0.336827 22.6641C0.4489 22.7758 0.58293 22.8633 0.730503 22.921C0.878077 22.9786 1.03601 23.0052 1.19439 22.9991C1.35276 22.993 1.50817 22.9544 1.65084 22.8855C1.79351 22.8167 1.92038 22.7192 2.02347 22.5991L11.5685 13.0911L21.102 22.5991C21.322 22.787 21.605 22.8852 21.8944 22.874C22.1838 22.8629 22.4584 22.7432 22.6632 22.539C22.868 22.3347 22.988 22.0609 22.9991 21.7722C23.0103 21.4836 22.9119 21.2013 22.7235 20.9819L13.19 11.4739Z" fill="black" />
                    </svg>
                </div>
                <nav>
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => isActive ? s.active : undefined}
                                    exact="true"
                                    onClick={() => setIsPopUp(false)}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}
