import { Link } from 'react-router-dom';
import logo from '/img/logo.svg'; 

import s from './Footer.module.scss';

export default function Footer() {
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
            path: '/',
        }
    ]

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className={s.footer}>
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
