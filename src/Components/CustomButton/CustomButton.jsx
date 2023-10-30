import PropTypes from 'prop-types';

import s from './CustomButton.module.scss';

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    noArrow: PropTypes.bool.isRequired,
    white: PropTypes.bool
};
CustomButton.defaultProps = {
    noArrow: false
};
export default function CustomButton({ text, noArrow, white }) {
    return (
        <button className={s.customBtn} type='button' style={{ backgroundColor: white ? '#fff' : "auto" }}>
            <div className={s.text}>
                {text}
            </div>
            {
                noArrow ? null : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="30" viewBox="0 0 16 30" fill="none">
                    <path d="M13.2655 15L0.332184 1.91705C0.225702 1.81161 0.141519 1.68644 0.0845067 1.54877C0.0274942 1.4111 -0.00121526 1.26367 3.94178e-05 1.11501C0.0012941 0.966349 0.0324872 0.819408 0.0918154 0.682691C0.151144 0.545974 0.237429 0.422197 0.345676 0.31852C0.453923 0.214844 0.581984 0.133327 0.722447 0.0786887C0.862911 0.0240501 1.01299 -0.0026262 1.164 0.000203734C1.315 0.00303367 1.46394 0.0353136 1.60219 0.0951755C1.74044 0.155037 1.86525 0.241293 1.96941 0.34895L15.6765 14.216C15.8839 14.4259 16 14.7071 16 15C16 15.2929 15.8839 15.5741 15.6765 15.784L1.96941 29.6511C1.86525 29.7587 1.74044 29.845 1.60219 29.9048C1.46394 29.9647 1.315 29.997 1.164 29.9998C1.01299 30.0026 0.862911 29.976 0.722447 29.9213C0.581984 29.8667 0.453923 29.7852 0.345676 29.6815C0.237429 29.5778 0.151144 29.454 0.0918154 29.3173C0.0324872 29.1806 0.0012941 29.0337 3.94178e-05 28.885C-0.00121526 28.7363 0.0274942 28.5889 0.0845067 28.4512C0.141519 28.3136 0.225702 28.1884 0.332184 28.083L13.2655 15Z" fill="black" />
                </svg>
            }

        </button>
    )
}
