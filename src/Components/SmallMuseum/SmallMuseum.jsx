import PropTypes from "prop-types";

import s from './SmallMuseum.module.scss';
import CustomButton from "../CustomButton/CustomButton";

SmallMuseum.propTypes = {
    museum: PropTypes.object.isRequired,
};

//TEST

export default function SmallMuseum({ museum }) {

    return (
        <section className={s.small_museum}>
            <div className={s.description}>
                <CustomButton text={museum.description} />
            </div>
            <div className={s.content}>
                <div className={s.photo}>
                    {museum.photo}
                </div>
                <div className={s.text}>
                    {museum.text}
                </div>
            </div>
        </section>
    )
}
