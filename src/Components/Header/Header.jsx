import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import s from './Header.module.scss';
import logo from '/img/logo.svg';

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > (window.lastScrollY || 0)) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            window.lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
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
            name: 'Інформація',
            path: '/info',
        },
        {
            name: 'Музей',
            path: '/museum',
        }
    ]

    return (
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
        </ header>
    )
}
