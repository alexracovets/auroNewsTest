import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';

import s from './SmallInfo.module.scss';

SmallInfo.propTypes = {
    info: PropTypes.object.isRequired,
};

import { setInfo } from '../../store/reducers/popups.js';

export default function SmallInfo({ info }) {
    const dispatch = useDispatch();

    const OnHandler = (item) => {
        dispatch(setInfo(item));
    }

    return (
        <div className={s.small_info} onClick={() => OnHandler(info)}>
            <div className={s.content}>
                <div className={s.photo}>
                    {info.photo}
                </div>
                <div className={s.text}>
                    {info.text}
                </div>
            </div>
        </div>
    )
}
