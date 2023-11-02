import { useState, useEffect } from 'react';

import PlusSvg from './PlusSvg/PlusSvg';
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
import updateList from '../../const/updateList';

import s from './AdminNews.module.scss';

export default function AdminNews() {
    const [items, setItems] = useState([]);
    const [popUpAdded, setPopUpAdd] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [dataItem, setDataItem] = useState(null);

    const dataRef = firestoreRef('/data/news');
    const fetch = () => fetchData(dataRef, setItems, true);
    const update = () => updateList(dataRef, fetch);

    const renderItems = (classWrapper, start, end) => {
        return (
            <div className={classWrapper}>
                {items.slice(start, end).map((item) => (
                    <div className={s.item} key={item.key}>
                        <div className={s.item_content}>
                            <div className={s.item__img} style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className={s.item__name}>{item.title}</div>
                        </div>
                        <div className={s.item_setting}>
                            <div className={s.setting__arrow + ' ' + s.arrowBottom} onClick={() => changePosition(item, items, dataRef, fetch, true)}><Arrow /></div>
                            <div className={s.setting__arrow + ' ' + s.arrowTop} onClick={() => changePosition(item, items, dataRef, fetch, false)}><Arrow /></div>
                            <div className={s.setting__edit} onClick={() => editDataItem(item, setDataItem, setPopUpEdit)}><SettingSvg /></div>
                            <div className={s.setting__cross} onClick={() => deleteDataItem(item.key, dataRef, setItems)}><CrossSvg /></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    useEffect(() => {
        (items.length === 0) && fetch();
    }, [items]);

    return (
        <section>
            <div className={s.added} onClick={() => setPopUpAdd(true)}><PlusSvg /></div>
            <div className={s.news}>
                {renderItems(s.item_wrapper + ' ' + s.first, 0, 1,)}
                {renderItems(s.item_wrapper + ' ' + s.second, 1, 6)}
                {renderItems(s.item_wrapper + ' ' + s.third, 6)}
            </div>
            {popUpAdded && <PopUpAdd dataRef={dataRef} fetchData={fetch} setPopUpAdd={setPopUpAdd} changePosition={changePosition} updateList={update} />}
            {popUpEdit && <PopUpEdit dataRef={dataRef} fetchData={fetch} item={dataItem} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
