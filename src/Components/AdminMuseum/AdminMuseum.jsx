import { useState, useEffect } from 'react';

import SettingSvg from './SettingSvg/SettingSvg';
import CrossSvg from './CrossSvg/CrossSvg';
import PopUpAdd from './PopUpAdd/PopUpAdd';
import PlusSvg from './PlusSvg/PlusSvg';
import PopUpEdit from './PopUpEdit/PopUpEdit';

import firestoreRef from '../../const/firestoreRef';
import fetchData from '../../const/fetchData';
import deleteDataItem from '../../const/deleteDataItem';
import editDataItem from '../../const/editDataItem';

import s from './AdminMuseum.module.scss';

export default function AdminMuseum() {
    const [items, setItems] = useState([]);
    const [popUpAdded, setPopUpAdd] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [dataItem, setDataItem] = useState(null);

    const dataRef = firestoreRef('/data/museums');
    const fetch = () => fetchData(dataRef, setItems, false);

    const renderItems = () => items.map((item) => (
        <div className={s.item} key={item.key}>
            <div className={s.item_content}>
                <div className={s.item__img} style={{ backgroundImage: `url(${item.image})` }}> </div>
                <div className={s.item__name}>{item.title}</div>
            </div>
            <div className={s.item_setting}>
                <div className={s.setting__edit} onClick={() => editDataItem(item, setDataItem, setPopUpEdit)}><SettingSvg /></div>
                <div className={s.setting__cross} onClick={() => deleteDataItem(item.key, dataRef, setItems)}><CrossSvg /></div>
            </div>
        </div>
    ));

    useEffect(() => {
        (items.length === 0) && fetch();
    }, [items]);

    return (
        <section>
            <div className={s.added} onClick={() => setPopUpAdd(true)}> <PlusSvg /> </div>
            <div className={s.items}> {renderItems()} </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetch} setPopUpAdd={setPopUpAdd} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetch} item={dataItem} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
