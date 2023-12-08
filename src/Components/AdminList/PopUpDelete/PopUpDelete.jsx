import PropTypes from 'prop-types';

import s from './PopUpDelete.module.scss';

PopUpDelete.propTypes = {
    action: PropTypes.func,
    deletKey: PropTypes.string,
    setDeletKey: PropTypes.func
};

export default function PopUpDelete({ action, deletKey, setDeletKey }) {

    return (
        <div className={deletKey ? s.PopDelet + ' ' + s.active : s.PopDelet}>
            <div className={s.wrapper}>
                <h4 className={s.title}>Ви впевнені в видаленні?</h4>
                <div className={s.btns}>
                    <button className={s.btn + ' ' + s.yeas} onClick={() => { action(); setDeletKey(null) }}>Так</button>
                    <button className={s.btn + ' ' + s.no} onClick={() => setDeletKey(null)}>Ні</button>
                </div>
            </div>
        </div>
    );
}
