import { useState } from 'react';
import PropTypes from 'prop-types';

import PlusSvg from "../PlusSvg/PlusSvg";
import CrossSvg from '../CrossSvg/CrossSvg';
import InputsNews from './InputsNews/InputsNews';
import InputsMuseum from './InputsMuseum/InputsMuseum';
import CustomButton from "../../CustomButton/CustomButton";
import InputsMemorial from './InputsMemorial/InputsMemorial';

import changeItem from '../../../const/admin/changeItem';
import textInputAdd from '../../../const/admin/textInputAdd';

import s from './PopUpEdit.module.scss';

PopUpEdit.propTypes = {
    name: PropTypes.string,
    item: PropTypes.object,
    setPopUpEdit: PropTypes.func,
    update: PropTypes.func
};

export default function PopUpEdit({ name, item, setPopUpEdit, update }) {
    const [isBold, setIsBold] = useState(false);
    const [imageLoad, setImageLoad] = useState(true);
    const [dataItem, setDataItem] = useState({
        title: item.title,
        image: item.image || null,
        age: item.age || null,
        likes: item.likes || 0,
        position: item.position || null,
        text: item.text || [],
        date: item.date,
        count: item.count,
        key: item.key
    });

    return (
        <form className={s.editForm}>
            <div className={s.form_wrapper}>
                <div className={s.cross} onClick={() => setPopUpEdit(false)}><CrossSvg /></div>
                {name === 'news-list' ? <InputsNews name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} /> : null}
                {name === 'memorial-list' ? <InputsMemorial name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} /> : null}
                {name === 'museum-list' ? <InputsMuseum name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} /> : null}
                <div className={s.addText} onClick={() => textInputAdd(isBold, setDataItem)}>
                    <div className={s.text_name}>Додати текст</div>
                    <div className={s.text_plus}> <PlusSvg /> </div>
                </div>
                <div className={s.isFat}>
                    <div className={s.text}> Жирний текст </div>
                    <input type="checkbox" checked={isBold} onChange={() => setIsBold(!isBold)} />
                </div>
                <div className={s.buttom} onClick={() =>
                    changeItem(name, dataItem, update, setPopUpEdit)
                }>
                    <CustomButton text='Застосувати Зміни' noArrow />
                </div>
            </div>
        </form>
    );
}