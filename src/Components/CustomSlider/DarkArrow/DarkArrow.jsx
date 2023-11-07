import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

DarkArrow.propTypes = {
    vector: PropTypes.string.isRequired,
    clickAction: PropTypes.func.isRequired,
    currentSlide: PropTypes.number,
    slider: PropTypes.object.isRequired
};

import s from './DarkArrow.module.scss';

export default function DarkArrow({ vector, clickAction, currentSlide, slider }) {
    const [disabled, setDisabled] = useState(null);
    const [slides, setSlides] = useState(null);

    useEffect(() => {
        setSlides(slider.current.props.children.length);
    }, [slider])

    useEffect(() => {
        if (vector === 'prev') {
            currentSlide === 0 ? setDisabled(true) : setDisabled(false)
        } else currentSlide === (slides - 1) ? setDisabled(true) : setDisabled(false)
    }, [currentSlide, slides, vector])

    return (
        <button className={
            vector === "prev"
                ? s.arrow + " " + s.arrow_Prev + ' ' + (
                    disabled
                        ? s.disabled
                        : null
                )
                : s.arrow + " " + s.arrow_Next + ' ' + (
                    disabled
                        ? s.disabled
                        : null
                )}
            onClick={() => clickAction()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="25" viewBox="0 0 13 25" fill="none">
                <path d="M2.36057 12.4999L12.4337 1.9329C12.5166 1.84775 12.5822 1.74665 12.6266 1.63545C12.671 1.52426 12.6933 1.40518 12.6924 1.28511C12.6914 1.16503 12.6671 1.04635 12.6209 0.935926C12.5747 0.825501 12.5075 0.725526 12.4232 0.641788C12.3388 0.558049 12.2391 0.492209 12.1297 0.448078C12.0203 0.403947 11.9034 0.3824 11.7858 0.384686C11.6682 0.386972 11.5522 0.413044 11.4445 0.461394C11.3368 0.509744 11.2396 0.579412 11.1585 0.666365L0.482836 11.8666C0.321251 12.0362 0.230844 12.2634 0.230844 12.4999C0.230844 12.7364 0.321251 12.9636 0.482836 13.1332L11.1585 24.3334C11.2396 24.4204 11.3368 24.4901 11.4445 24.5384C11.5522 24.5868 11.6682 24.6128 11.7858 24.6151C11.9034 24.6174 12.0203 24.5959 12.1297 24.5517C12.2391 24.5076 12.3388 24.4418 12.4232 24.358C12.5075 24.2743 12.5747 24.1743 12.6209 24.0639C12.6671 23.9535 12.6914 23.8348 12.6924 23.7147C12.6933 23.5946 12.671 23.4756 12.6266 23.3644C12.5822 23.2532 12.5166 23.1521 12.4337 23.0669L2.36057 12.4999Z" fill="white" />
            </svg>
        </button>

    )
}
