import PropTypes from 'prop-types';

import SettingSvg from '../../SettingSvg/SettingSvg';
import CrossSvg from '../../CrossSvg/CrossSvg';
import Arrow from '../../Arrow/Arrow';

import deleteDataItem from '../../../../const/deleteDataItem';
import changePosition from '../../../../const/changePosition';
import editDataItem from '../../../../const/editDataItem';
import checkLength from '../../../../const/checkLength';
import fetchData from '../../../../const/fetchData';

import s from '../../AdminNews.module.scss';

RenderMemorials.propTypes = {
    items: PropTypes.array,
    dataRef: PropTypes.object,
    setDataItem: PropTypes.func,
    setPopUpEdit: PropTypes.func,
    setItems: PropTypes.func
};

export default function RenderMemorials({ items, dataRef, setDataItem, setItems, setPopUpEdit }) {

    const fetchItem = () => fetchData(dataRef, setItems, true);

    const renderMemorial = () => {
        return (
            <div className={s.wrapperBlock}>
                <div className={s.items}>
                    {items.map((item) => (
                        <div className={s.item} key={item.key}>
                            <div className={s.item_content}>
                                <div className={s.date}> {item.date} </div>
                                <div className={s.name}> {checkLength(item.title, 30)} </div>
                            </div>
                            <div className={s.item_setting}>
                                <div className={s.arrows}>
                                    <div className={s.arrow + ' ' + s.arrowBottom} onClick={() => changePosition(item, items, dataRef, fetchItem, true)}><Arrow /></div>
                                    <div className={s.arrow + ' ' + s.arrowTop} onClick={() => changePosition(item, items, dataRef, fetchItem, false)}><Arrow /></div>
                                </div>
                                <div className={s.setting} onClick={() => editDataItem(item, setDataItem, setPopUpEdit)}><SettingSvg /></div>
                                <div className={s.cross} onClick={() => deleteDataItem(item.key, dataRef, setItems)}><CrossSvg /></div>
                                <div className={s.setting__cross} onClick={() => deleteDataItem(item.key, dataRef, setItems)}><CrossSvg /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        renderMemorial()
    );
}
