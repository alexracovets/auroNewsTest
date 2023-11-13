import PropTypes from 'prop-types';

import s from './AdminPanel.module.scss';

AdminPanel.propTypes = {
    onMenuItemClick: PropTypes.func.isRequired,
    selectedMenuItem: PropTypes.string.isRequired,
};
export default function AdminPanel({ selectedMenuItem, onMenuItemClick }) {

    return (
        <section className={s.AdminPanel}>
            <div className={s.AdminPanel_wrapper}>
                <div className={selectedMenuItem === 'news' ? s.item + ' ' + s.active : s.item} onClick={() => onMenuItemClick('news')}>Новини</div>
                <div className={selectedMenuItem === 'memorial' ? s.item + ' ' + s.active : s.item} onClick={() => onMenuItemClick('memorial')}>Меморіал</div>
                <div className={selectedMenuItem === 'museum' ? s.item + ' ' + s.active : s.item} onClick={() => onMenuItemClick('museum')}>Музей</div>
            </div>
        </section>
    )
}
