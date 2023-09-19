import { Link, NavLink } from 'react-router-dom';

import s from './Header.module.scss';
import logo from '/img/logo.svg';

export default function Header() {

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
        <header>
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
        </header>
    )
}
