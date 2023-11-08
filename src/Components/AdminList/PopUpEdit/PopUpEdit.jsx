import { useState } from 'react';
import PropTypes from 'prop-types';

import CustomButton from "../../CustomButton/CustomButton";
import PlusSvg from "../PlusSvg/PlusSvg";
import CrossSvg from '../CrossSvg/CrossSvg';

import addText from '../../../const/admin/addText';
import changeItem from '../../../const/admin/changeItem';

import s from './PopUpEdit.module.scss';

import InputsNews from './InputsNews/InputsNews';
import InputsMuseum from './InputsMuseum/InputsMuseum';
import InputsMemorial from './InputsMemorial/InputsMemorial';

PopUpEdit.propTypes = {
    name: PropTypes.string,
    dataRef: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setPopUpEdit: PropTypes.func.isRequired
};

export default function PopUpEdit({ name, dataRef, fetchData, item, setPopUpEdit }) {
    const [isBold, setIsBold] = useState(false);
    const [imageLoad, setImageLoad] = useState(true);
    const [dataItem, setDataItem] = useState({
        title: item.title || null,
        image: item.image || null,
        age: item.age || null,
        position: item.position || null,
        likes: item.likes || null,
        text: item.text || [],
        date: item.date,
        key: item.key
    });

    return (
        <form className={s.editForm}>
            <div className={s.form_wrapper}>
                <div className={s.cross} onClick={() => setPopUpEdit(false)}><CrossSvg /></div>
                {name === 'news' ? <InputsNews name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} /> : null}
                {name === 'memorial' ? <InputsMemorial name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} /> : null}
                {name === 'museum' ? <InputsMuseum name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} /> : null}
                <div className={s.addText} onClick={() => addText(isBold, setDataItem)}>
                    <div className={s.text_name}>Додати текст</div>
                    <div className={s.text_plus}> <PlusSvg /> </div>
                </div>
                <div className={s.isFat}>
                    <div className={s.text}> Жирний текст </div>
                    <input type="checkbox" checked={isBold} onChange={() => setIsBold(!isBold)} />
                </div>
                <div className={s.buttom} onClick={() => changeItem(dataItem, dataRef, fetchData, setPopUpEdit)}>
                    <CustomButton text='Застосувати Зміни' noArrow />
                </div>
            </div>
        </form>
    );
}