import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import CustomButton from '../CustomButton/CustomButton';

import s from './CustomBlock.module.scss';
import CustomCircle from '../CustomCircle/CustomCircle';

CustomBlock.propTypes = {
    data: PropTypes.object.isRequired,
};

export default function CustomBlock({ data }) {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <section className={data.reverse ? s.customBlock + ' ' + s.reverse : s.customBlock}>
            <div className={s.left}>
                <img src={data.img} alt="info" />
                <CustomCircle radius={data.circle.radius} position={data.circle.position} />
            </div>
            <div className={s.rigth}>
                <div className={s.infoWrapper}>
                    <div className={s.title}>
                        {data.title}
                    </div>
                    <div className={s.description}>
                        {data.description}
                    </div>
                    <div className={s.link}>
                        <Link to={data.link} onClick={scrollToTop}>
                            <CustomButton text={data.btn} />
                        </Link>
                    </div>
                </div>
            </div>
        </section >

    )
}
