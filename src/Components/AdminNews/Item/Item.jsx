import PropTypes from 'prop-types';

import CrossSvg from '../CrossSvg/CrossSvg';
import SettingSvg from '../SettingSvg/SettingSvg';
import Arrow from '../Arrow/Arrow';

import s from './Item.module.scss';

Item.propTypes = {
    list: PropTypes.array,
    deletNews: PropTypes.func.isRequired,
    changePosition: PropTypes.func.isRequired,
    editNew: PropTypes.func.isRequired
};

export default function Item({ list, deletNews, changePosition, editNew }) {
    return (
        <>
            {
                list.map((newsItem) => (
                    <div className={s.memo} key={newsItem.key}>
                        <div className={s.memo_content}>
                            <div className={s.memo__img} style={{ backgroundImage: `url(${newsItem.image})` }}> </div>
                            <div className={s.memo__name}>{newsItem.title}</div>
                        </div>
                        <div className={s.memo_setting}>
                            <div className={s.setting__arrow + ' ' + s.arrowBottom} onClick={() => changePosition(newsItem, +1)}><Arrow /></div>
                            <div className={s.setting__arrow + ' ' + s.arrowTop} onClick={() => changePosition(newsItem, -1)}><Arrow /></div>
                            <div className={s.setting__edit} onClick={() => editNew(newsItem)}><SettingSvg /></div>
                            <div className={s.setting__cross} onClick={() => deletNews(newsItem.key)}><CrossSvg /></div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}
