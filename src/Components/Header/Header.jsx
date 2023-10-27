import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import handleScroll from '../../const/handleScroll.js'

import s from './Header.module.scss';
import logo from '/img/logo.svg';

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false);

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
            name: 'Меморіал',
            path: '/memorial',
        },
        {
            name: 'Музей',
            path: '/museum',
        }
    ]

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <header className={isScrolled ? s.disable : null} >
            <div className={s.logo}>
                <Link to="/">
                    <img src={logo} alt="logo" onClick={scrollToTop} />
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
                                onClick={scrollToTop}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="burger">

            </div>
        </ header>
    )
}
