import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import PlusSvg from "../PlusSvg/PlusSvg";
import CrossSvg from '../CrossSvg/CrossSvg';
import InputsNews from './InputsNews/InputsNews';
import InputsMuseum from './InputsMuseum/InputsMuseum';
import CustomButton from "../../CustomButton/CustomButton";
import InputsMemorial from './InputsMemorial/InputsMemorial';

import textInputAdd from '../../../const/admin/textInputAdd';
import dataItemAdd from '../../../const/admin/dataItemAdd';
import getDate from '../../../const/admin/getDate';

import s from './PopUpAdd.module.scss';


PopUpAdd.propTypes = {
    name: PropTypes.string,
    setPopUpAdd: PropTypes.func,
    update: PropTypes.func
};

export default function PopUpAdd({ name, setPopUpAdd, update }) {
    const [isBold, setIsBold] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);
    const [dataItem, setDataItem] = useState({
        image: null,
        title: null,
        position: null,
        text: [],
        date: getDate(),
        likes: 0,
        count: -1,
        key: v4(),
        age: 34
    });
    console.log(dataItem.position)
    return (
        <form className={s.addForm}>
            <div className={s.form_wrapper}>
                <div className={s.cross} onClick={() => setPopUpAdd(false)}><CrossSvg /></div>
                {name === 'news-list' && <InputsNews name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} />}
                {name === 'memorial-list' && <InputsMemorial name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} />}
                {name === 'museum-list' && <InputsMuseum name={name} dataItem={dataItem} imageLoad={imageLoad} setDataItem={setDataItem} setImageLoad={setImageLoad} />}
                <div className={s.addText} onClick={() => textInputAdd(isBold, setDataItem)}>
                    <div className={s.text_name}>Додати текст</div>
                    <div className={s.text_plus}> <PlusSvg /> </div>
                </div>
                <div className={s.isFat}>
                    <div className={s.text}> Жирний текст </div>
                    <input type="checkbox" checked={isBold} onChange={() => setIsBold(!isBold)} />
                </div>
                <div className={s.buttom}
                    onClick={() => dataItemAdd(name, dataItem, setPopUpAdd, update)}
                >
                    <CustomButton text='Створити новину' noArrow />
                </div>
            </div>
        </form>
    );
}
