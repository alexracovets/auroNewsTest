import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import s from './PopupInfo.module.scss';

PopupInfo.propTypes = {
    data: PropTypes.object.isRequired
};

//TEST

import { setInfo } from '../../store/reducers/popups.js';

export default function PopupInfo({ data }) {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setInfo(null));
    }

    return (
        <div className={s.popup_info}>
            <div className={s.content}>
                <div className={s.photo}>
                    {data.photo}
                </div>
                <div className={s.text}>
                    {data.text}
                </div>
                <button className={s.close} onClick={() => onClose()}>X</button>
            </div>
        </div>
    )
}
