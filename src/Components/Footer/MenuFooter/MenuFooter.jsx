import { Link } from 'react-router-dom';
import logo from '/img/logo.svg';

import s from './MenuFooter.module.scss';

export default function MenuFooter() {
    
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
    )
}
