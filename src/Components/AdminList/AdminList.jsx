import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PopUpEdit from './PopUpEdit/PopUpEdit';
import PopUpAdd from './PopUpAdd/PopUpAdd';

import changePosition from '../../const/changePosition';
import firestoreRef from '../../const/firestoreRef';
import updateList from '../../const/updateList';
import fetchData from '../../const/fetchData';

import s from './AdminNews.module.scss';
import RenderNews from './Render/RenderNews/RenderNews';
import RenderMuseums from './Render/RenderMuseums/RenderMuseums';
import RenderMemorials from './Render/RenderMemorials/RenderMemorials';


AdminList.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default function AdminList({ name, title }) {
    const [items, setItems] = useState([]);
    const [popUpAdded, setPopUpAdd] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [dataItem, setDataItem] = useState(null);

    const dataRef = firestoreRef(`/data/${name}`);
    const fetch = () => fetchData(dataRef, setItems, true);
    const update = () => updateList(dataRef, fetch);

    useEffect(() => {
        (items.length === 0) && fetch();
    }, [items]);

    return (
        <section>
            <div className={s.added} onClick={() => setPopUpAdd(true)}>
                {title}
            </div>
            <div className={s.items}>
                {name === 'news' ? <RenderNews items={items} dataRef={dataRef} setDataItem={setDataItem} setItems={setItems} setPopUpEdit={setPopUpEdit} /> : null}
                {name === 'memorial' ? <RenderMemorials items={items} dataRef={dataRef} setDataItem={setDataItem} setItems={setItems} setPopUpEdit={setPopUpEdit} /> : null}
                {name === 'museum' ? <RenderMuseums items={items} dataRef={dataRef} setDataItem={setDataItem} setItems={setItems} setPopUpEdit={setPopUpEdit} /> : null}
            </div>
            {popUpAdded && <PopUpAdd name={name} dataRef={dataRef} fetchData={fetch} setPopUpAdd={setPopUpAdd} changePosition={changePosition} updateList={update} />}
            {popUpEdit && <PopUpEdit name={name} dataRef={dataRef} fetchData={fetch} item={dataItem} setPopUpEdit={setPopUpEdit} />}
        </section >
    );
}
