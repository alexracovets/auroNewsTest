import PropTypes from 'prop-types';

import s from './PopUp.module.scss';

PopUp.propTypes = {
    isPopUpOpen: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

export default function PopUp({ isPopUpOpen, children }) {

    return (
        <div className={isPopUpOpen ? s.PopUp + ' ' + s.active : s.PopUp}>
            {children}
        </div>
    )
}
