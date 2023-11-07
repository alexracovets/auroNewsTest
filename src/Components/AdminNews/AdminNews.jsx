import { useState, useEffect } from 'react';

import PopUpEdit from './PopUpEdit/PopUpEdit';
import PopUpAdd from './PopUpAdd/PopUpAdd';
import CrossSvg from './CrossSvg/CrossSvg';
import SettingSvg from './SettingSvg/SettingSvg';
import Arrow from './Arrow/Arrow';

import firestoreRef from '../../const/firestoreRef';
import fetchData from '../../const/fetchData';
import deleteDataItem from '../../const/deleteDataItem';
import editDataItem from '../../const/editDataItem';
import changePosition from '../../const/changePosition';
import checkLength from '../../const/checkLength';
import updateList from '../../const/updateList';
import heart from '/img/heart.svg'

import s from './AdminNews.module.scss';

export default function AdminNews() {
    const [items, setItems] = useState([]);
    const [popUpAdded, setPopUpAdd] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [dataItem, setDataItem] = useState(null);

    const dataRef = firestoreRef('/data/news');
    const fetch = () => fetchData(dataRef, setItems, true);
    const update = () => updateList(dataRef, fetch);

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

    const renderItems = (wrapper, start, end) => {
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
                                    <div className={s.arrow + ' ' + s.arrowBottom} onClick={() => changePosition(item, items, dataRef, fetch, true)}><Arrow /></div>
                                    <div className={s.arrow + ' ' + s.arrowTop} onClick={() => changePosition(item, items, dataRef, fetch, false)}><Arrow /></div>
                                </div>
                                <div className={s.setting} onClick={() => editDataItem(item, setDataItem, setPopUpEdit)}>
                                    <SettingSvg />
                                </div>
                                <div className={s.cross} onClick={() => deleteDataItem(item.key, dataRef, setItems)}>
                                    <CrossSvg />
                                </div>
                                <div className={s.setting__cross} onClick={() => deleteDataItem(item.key, dataRef, setItems)}><CrossSvg /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    useEffect(() => {
        (items.length === 0) && fetch();
    }, [items]);

    return (
        <section>
            <div className={s.added} onClick={() => setPopUpAdd(true)}>
                Додати Новину
            </div>
            <div className={s.news}>
                {renderItems(titles.first, 0, 1,)}
                {renderItems(titles.five, 1, 6)}
                {renderItems(titles.other, 6)}
            </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetch} setPopUpAdd={setPopUpAdd} changePosition={changePosition} updateList={update} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetch} item={dataItem} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
