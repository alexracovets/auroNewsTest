import PropTypes from 'prop-types';

import s from './SubArrow.module.scss';
import { useEffect, useState } from 'react';

SubArrow.propTypes = {
    vector: PropTypes.string.isRequired,
    clickAction: PropTypes.func.isRequired,
    currentSlide: PropTypes.number.isRequired,
    slider: PropTypes.object.isRequired,
    itemsLength: PropTypes.number
};


export default function SubArrow({ vector, clickAction, currentSlide, slider, itemsLength }) {
    const [disabled, setDisabled] = useState(null);
    const [slides, setSlides] = useState(null);

    useEffect(() => {
        setSlides(slider.current.props.children.length);
    }, [slider])

    useEffect(() => {
        if (vector === 'prev') {
            currentSlide === 0 ? setDisabled(true) : setDisabled(false)
        } else {
            currentSlide === itemsLength-1 ? setDisabled(true) : setDisabled(false)
        }
    }, [currentSlide, slides, vector, itemsLength])

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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="35" viewBox="0 0 18 35" fill="none">
                <path d="M3.07627 17.5L17.6263 2.23655C17.7461 2.11355 17.8408 1.96751 17.9049 1.8069C17.9691 1.64629 18.0014 1.47429 18 1.30085C17.9985 1.12741 17.9635 0.955976 17.8967 0.796473C17.83 0.63697 17.7329 0.492563 17.6111 0.371607C17.4893 0.250651 17.3453 0.155549 17.1872 0.0918035C17.0292 0.0280584 16.8604 -0.0030639 16.6905 0.00023769C16.5206 0.00353928 16.3531 0.0411993 16.1975 0.111038C16.042 0.180877 15.9016 0.281508 15.7844 0.407108L0.363989 16.5853C0.130589 16.8302 0 17.1583 0 17.5C0 17.8417 0.130589 18.1698 0.363989 18.4147L15.7844 34.5929C15.9016 34.7185 16.042 34.8191 16.1975 34.889C16.3531 34.9588 16.5206 34.9965 16.6905 34.9998C16.8604 35.0031 17.0292 34.9719 17.1872 34.9082C17.3453 34.8445 17.4893 34.7494 17.6111 34.6284C17.7329 34.5074 17.83 34.363 17.8967 34.2035C17.9635 34.044 17.9985 33.8726 18 33.6992C18.0014 33.5257 17.9691 33.3537 17.9049 33.1931C17.8408 33.0325 17.7461 32.8865 17.6263 32.7634L3.07627 17.5Z" fill="black" />
            </svg>
        </button>

    )
}
