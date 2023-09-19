import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';

import s from './SmallNews.module.scss';

SmallNews.propTypes = {
    news: PropTypes.object.isRequired,
};

//TEST

export default function SmallNews({ news }) {

    return (
        <div className={s.small_new}>
            <div className={s.description}>
                <Link to={`/news/${news.id}`}>
                    <CustomButton text={news.description} />
                </Link>
            </div>
            <div className={s.content}>
                <div className={s.photo}>
                    {news.photo}
                </div>
                <div className={s.text}>
                    {news.text}
                </div>
            </div>
            <div className={s.down_side}>
                <div className={s.read}>
                    <Link to={`/news/${news.id}`}>
                        <CustomButton text="Читати" />
                    </Link>
                </div>
                <div className={s.likes}>
                    <div className={s.image}>
                        <img src={`./img/heart.svg`} />
                    </div>
                    <div className={s.count}>
                        {news.likes}
                    </div>
                </div>
            </div>

        </div>
    )
}
