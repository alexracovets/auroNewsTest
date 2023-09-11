import CustomButton from '../CustomButton/CustomButton';
import { Link } from 'react-router-dom';

import s from './ShortNews.module.scss';

export default function ShortNews() {

    return (
        <div className={s.short_news}>
            <h3 className={s.title}>
                Новини
            </h3>
            <div className={s.news_list}>
                <div className={s.item}>
                    Новина 1. Найсвіжіша новина + Опис
                </div>
                <div className={s.item}>
                    Новина 2 новина + Опис
                </div>
                <div className={s.item}>
                    Новина 3 новина + Опис
                </div>
            </div>
            <div className={s.all}>
                <Link to="/news">
                    <CustomButton text="Читати Всі Новини" />
                </Link>
            </div>
        </div>
    )
}
