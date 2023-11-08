import { useState, useEffect } from 'react';

import SettingSvg from './SettingSvg/SettingSvg';
import PopUpEdit from './PopUpEdit/PopUpEdit';
import CrossSvg from './CrossSvg/CrossSvg';
import PopUpAdd from './PopUpAdd/PopUpAdd';
import Arrow from './Arrow/Arrow';

import deleteDataItem from '../../const/deleteDataItem';
import changePosition from '../../const/changePosition';
import editDataItem from '../../const/editDataItem';
import firestoreRef from '../../const/firestoreRef';
import checkLength from '../../const/checkLength';
import updateList from '../../const/updateList';
import fetchData from '../../const/fetchData';

import s from './AdminMuseum.module.scss';

export default function AdminMuseum() {
    const [items, setItems] = useState([]);
    const [popUpAdded, setPopUpAdd] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [dataItem, setDataItem] = useState(null);

    const dataRef = firestoreRef('/data/museums');
    const fetch = () => fetchData(dataRef, setItems, true);
    const update = () => updateList(dataRef, fetch);

    const renderItems = () => {
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
                Додати Музей
            </div>
            <div className={s.items}>
                {renderItems()}
            </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetch} setPopUpAdd={setPopUpAdd} changePosition={changePosition} updateList={update} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetch} item={dataItem} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
