import PropTypes from 'prop-types';
import { useState } from 'react';

import PopUpDelete from '../../PopUpDelete/PopUpDelete';
import SettingSvg from '../../SettingSvg/SettingSvg';
import CrossSvg from '../../CrossSvg/CrossSvg';
import Arrow from '../../Arrow/Arrow';

import dataItemPosition from '../../../../const/admin/dataItemPosition';
import dataItemDelete from '../../../../const/admin/dataItemDelete';
import editDataItem from '../../../../const/admin/dataItemEdit';
import checkLength from '../../../../const/checkLength';
import heart from '/img/heart.svg'

import s from '../../AdminNews.module.scss';

RenderNews.propTypes = {
    items: PropTypes.array,
    setDataItem: PropTypes.func,
    setPopUpEdit: PropTypes.func,
    name: PropTypes.string,
    update: PropTypes.func
};

export default function RenderNews({ items, setDataItem, setPopUpEdit, name, update }) {
    const [deletKey, setDeletKey] = useState(null);
    const titles = {
        first: {
            value: 'Головна Новина',
            style: s.first
        },
        five: {
            value: 'Наступні 5',
            style: s.five
        },
        other: {
            value: 'Інші Новини',
            style: s.other
        }
    }

    const deletItem = () => {
        dataItemDelete(deletKey, name, update)
    }
    const renderNews = (wrapper, start, end) => {
        return (
            <div className={s.wrapperBlock + ' ' + wrapper.style}>
                <div className={s.title}>
                    {wrapper.value}
                </div>
                <div className={s.items}>
                    {items.slice(start, end).map((item) => (
                        <div className={s.item} key={item.key}>
                            <div className={s.item_content}>
                                <div className={s.date}> {item.date} </div>
                                <div className={s.name}> {checkLength(item.title, 30)} </div>
                                <div className={s.like}>
                                    <img src={heart} alt="heart" />
                                    <div className={s.count}>{item.likes}</div>
                                </div>
                            </div>
                            <div className={s.item_setting}>
                                <div className={s.arrows}>
                                    <div className={s.arrow + ' ' + s.arrowBottom} onClick={() => dataItemPosition(item, items, name, true, update)}><Arrow /></div>
                                    <div className={s.arrow + ' ' + s.arrowTop} onClick={() => dataItemPosition(item, items, name, false, update)}><Arrow /></div>
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
            {renderNews(titles.first, 0, 1,)}
            {renderNews(titles.five, 1, 6)}
            {renderNews(titles.other, 6)}
            <PopUpDelete action={deletItem} deletKey={deletKey} setDeletKey={setDeletKey} />
        </>
    );
}
