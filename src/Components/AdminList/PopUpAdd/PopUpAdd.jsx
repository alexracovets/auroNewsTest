import { useState } from 'react';
import PropTypes from 'prop-types';

import CustomButton from "../../CustomButton/CustomButton";
import PlusSvg from "../PlusSvg/PlusSvg";
import CrossSvg from '../CrossSvg/CrossSvg';

import createItem from '../../../const/admin/createItem';
import addText from '../../../const/admin/addText';
import getDate from '../../../const/admin/getDate'; 

import s from './PopUpAdd.module.scss';
import InputsNews from './InputsNews/InputsNews';
import InputsMuseum from './InputsMuseum/InputsMuseum';
import InputsMemorial from './InputsMemorial/InputsMemorial';

PopUpAdd.propTypes = {
    name: PropTypes.string.isRequired,
    dataRef: PropTypes.object.isRequired,
    setPopUpAdd: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired
};

export default function PopUpAdd({ name, dataRef, setPopUpAdd, updateList }) {
    const [isBold, setIsBold] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);
    const [dataItem, setDataItem] = useState({
        image: null,
        title: null,
        age: null,
        position: null,
        text: [],
        date: getDate(),
        likes: 0,
        count: -1,
        key: null
    });

    return (
        <form className={s.addForm}>
            <div className={s.form_wrapper}>
                <div className={s.cross} onClick={() => setPopUpAdd(false)}><CrossSvg /></div>
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
                <div className={s.buttom} onClick={() => createItem(dataItem, ['image', 'title', 'date'], dataRef, updateList, setPopUpAdd)}>
                    <CustomButton text='Створити новину' noArrow />
                </div>
            </div>
        </form>
    );
}
