import PropTypes from 'prop-types';
import { useState } from 'react';

import PopUpDelete from '../../PopUpDelete/PopUpDelete';
import SettingSvg from '../../SettingSvg/SettingSvg';
import CrossSvg from '../../CrossSvg/CrossSvg';
import Arrow from '../../Arrow/Arrow';

import dataItemDelete from '../../../../const/admin/dataItemDelete';
import editDataItem from '../../../../const/admin/dataItemEdit';
import checkLength from '../../../../const/checkLength';

import s from '../../AdminNews.module.scss';

RenderMemorials.propTypes = {
    items: PropTypes.array,
    setDataItem: PropTypes.func,
    setPopUpEdit: PropTypes.func,
    name: PropTypes.string,
    update: PropTypes.func
};

export default function RenderMemorials({ items, setDataItem, setPopUpEdit, name, update }) {
    const [deletKey, setDeletKey] = useState(null);
    const deletItem = () => {
        dataItemDelete(deletKey, name, update)
    }

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
                                    <div className={s.arrow + ' ' + s.arrowBottom} ><Arrow /></div>
                                    <div className={s.arrow + ' ' + s.arrowTop} ><Arrow /></div>
                                </div>
                                <div className={s.setting} onClick={() => editDataItem(item, setDataItem, setPopUpEdit)}><SettingSvg /></div>
                                <div className={s.cross} onClick={() => setDeletKey(item.key)}><CrossSvg /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderMemorial()}
            <PopUpDelete action={deletItem} deletKey={deletKey} setDeletKey={setDeletKey} />
        </>
    );
}
