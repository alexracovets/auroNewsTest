import PropTypes from 'prop-types';

import s from './AdminPanel.module.scss';

AdminPanel.propTypes = {
    onMenuItemClick: PropTypes.func.isRequired
};
export default function AdminPanel({ onMenuItemClick }) {

    return (
        <div className={s.adminePanel}>
            <div className={s.item} onClick={() => onMenuItemClick('news')}>
                Новини
            </div>
            <div className={s.item} onClick={() => onMenuItemClick('memorial')}>
                Меморіал
            </div>
            <div className={s.item} onClick={() => onMenuItemClick('museum')}>
                Музей
            </div>
        </div>
    )
}
