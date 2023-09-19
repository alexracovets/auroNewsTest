import PropTypes from 'prop-types';

import s from './CustomCircle.module.scss';

CustomCircle.propTypes = {
    radius: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
};

export default function CustomCircle({ radius, position }) {
    return (
        <div
            className={s.circle}
            style={{ width: radius, height: radius, ...position }}
        >
        </div>
    )
}
