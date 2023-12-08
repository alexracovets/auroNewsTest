import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PopUpAdd from './PopUpAdd/PopUpAdd';
import PopUpEdit from './PopUpEdit/PopUpEdit';
import RenderNews from './Render/RenderNews/RenderNews';
import RenderMuseums from './Render/RenderMuseums/RenderMuseums';
import RenderMemorials from './Render/RenderMemorials/RenderMemorials';

import dataFetch from '../../const/admin/dataFetch';

import s from './AdminNews.module.scss';

AdminList.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default function AdminList({ name, title }) {
    const [items, setItems] = useState([]);
    const [popUpAdded, setPopUpAdd] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [dataItem, setDataItem] = useState(null);

    const getItem = (name) => {
        dataFetch(name, setItems)
    }

    useEffect(() => {
        getItem(name)
    }, [name]);

    return (
        <section>
            <div className={s.added} onClick={() => setPopUpAdd(true)}>{title}</div>
            <div className={s.items}>
                {name === 'news-list' && <RenderNews items={items} setDataItem={setDataItem} setPopUpEdit={setPopUpEdit} name={name} update={getItem} />}
                {name === 'memorial-list' && <RenderMemorials items={items} setDataItem={setDataItem} setPopUpEdit={setPopUpEdit} name={name} update={getItem} />}
                {name === 'museum-list' && <RenderMuseums items={items} setDataItem={setDataItem} setPopUpEdit={setPopUpEdit} name={name} update={getItem} />}
            </div>
            {popUpAdded && <PopUpAdd name={name} setPopUpAdd={setPopUpAdd} update={getItem} />}
            {popUpEdit && <PopUpEdit name={name} item={dataItem} setPopUpEdit={setPopUpEdit} update={getItem} />}
        </section >
    );
}
