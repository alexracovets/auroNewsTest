import PropTypes from 'prop-types';

import s from './CustomButton.module.scss';

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
};

export default function CustomButton({ text }) {
    return (
        <button className={s.customBtn}>
            {text}
        </button>
    )
}
