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
                <div className={selectedMenuItem === 'news-list' ? s.item + ' ' + s.active : s.item} onClick={() => onMenuItemClick('news-list')}>Новини</div>
                <div className={selectedMenuItem === 'memorial-list' ? s.item + ' ' + s.active : s.item} onClick={() => onMenuItemClick('memorial-list')}>Меморіал</div>
                <div className={selectedMenuItem === 'museum-list' ? s.item + ' ' + s.active : s.item} onClick={() => onMenuItemClick('museum-list')}>Музей</div>
            </div>
        </section>
    )
}
