import PropTypes from 'prop-types';

import s from './CustomButton.module.scss';

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    noArrow: PropTypes.bool.isRequired
};
CustomButton.defaultProps = {
    noArrow: false
};
export default function CustomButton({ text, noArrow }) {
    return (
        <button className={s.customBtn} type='button'>
            <div className={s.text}>
                {text}
            </div>
            {
                noArrow ? null : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <g clipPath="url(#clip0_2_55)">
                        <path d="M21.3333 6.66663C21.3333 7.65596 22.3107 9.13329 23.3 10.3733C24.572 11.9733 26.092 13.3693 27.8347 14.4346C29.1413 15.2333 30.7253 16 32 16M32 16C30.7253 16 29.14 16.7666 27.8347 17.5653C26.092 18.632 24.572 20.028 23.3 21.6253C22.3107 22.8666 21.3333 24.3466 21.3333 25.3333M32 16L1.49938e-06 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2_55">
                            <rect width="32" height="32" fill="white" transform="translate(32) rotate(90)" />
                        </clipPath>
                    </defs>
                </svg>
            }

        </button>
    )
}
