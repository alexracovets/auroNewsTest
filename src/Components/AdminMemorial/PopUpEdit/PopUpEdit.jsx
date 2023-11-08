


import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import CustomButton from "../../CustomButton/CustomButton";
import PlusSvg from "../PlusSvg/PlusSvg";
import CrossSvg from '../CrossSvg/CrossSvg';

import s from './PopUpEdit.module.scss';

PopUpEdit.propTypes = {
    dataRef: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setPopUpEdit: PropTypes.func.isRequired
};

export default function PopUpEdit({ dataRef, fetchData, item, setPopUpEdit }) {
    const [isBold, setIsBold] = useState(false);
    const [imageLoad, setImageLoad] = useState(true);
    const [dataItem, setDataItem] = useState({
        image: item.image,
        name: item.name,
        age: item.age,
        position: item.position,
        date: item.date,
        text: item.text || [],
        key: item.key
    });

    const handleInputChange = async (e, name, key) => {
        if (name === 'image') {
            const file = e.target.files[0];
            const imageRef = ref(storage, `test/${file.name + v4()}`);

            try {
                await uploadBytes(imageRef, file);
                const downloadURL = await getDownloadURL(imageRef);
                setDataItem((prevData) => ({ ...prevData, ['image']: downloadURL }));
                setImageLoad(true);
            } catch (error) {
                console.error("Помилка завантаження зображення:", error);
            }
        } else if (name === 'text') {
            const { value } = e.target;
            setDataItem((prevData) => {
                const newTextArray = prevData.text.map((item) =>
                    item.key === key ? { ...item, 'value': value } : item
                );
                return {
                    ...prevData,
                    text: newTextArray,
                };
            });
        } else {
            const { value } = e.target;
            setDataItem((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleRemoveText = (keyToRemove) => {
        setDataItem((prevData) => {
            const newTextArray = prevData.text.filter((item) => item.key !== keyToRemove);
            return {
                ...prevData,
                text: newTextArray,
            };
        });
    };

    const addText = (bold) => {
        const key = v4();
        setDataItem((prevData) => ({
            ...prevData,
            text: Array.isArray(prevData.text) ? [...prevData.text, { key, 'value': '', 'bold': bold }] : [{ key, 'value': '', 'bold': bold }],
        }));
    };

    const change = async () => {
        try {
            await dataRef.child(dataItem.key).set(dataItem);
            fetchData();
            setPopUpEdit(false);
        } catch (error) {
            console.error('Помилка зміни:', error);
        }
    };

    return (
        <form className={s.add_memo}>
            <div className={s.memo_wrapper}>
                <div className={s.cross_main} onClick={() => setPopUpEdit(false)}>
                    <CrossSvg />
                </div>
                <div className={s.wrapper_label}>
                    <div className={s.download_wrapper}>
                        <div
                            className={s.download}
                            style={{ backgroundImage: imageLoad ? `url(${dataItem.image})` : 'none' }}
                        ></div>
                    </div>
                    <label htmlFor='image' className={s.label_image}>
                        <div className={s.status}>{imageLoad ? 'Фото завантажене' : 'Додати фото'}</div>
                    </label>
                </div>
                {console.log(dataItem)}
                <input type='text' placeholder='ПIП' onChange={(e) => handleInputChange(e, 'name')} value={dataItem.name} />
                <input type='text' placeholder='Роки життя' onChange={(e) => handleInputChange(e, 'age')} value={dataItem.age} />
                <input type='text' placeholder='Посада' onChange={(e) => handleInputChange(e, 'position')} value={dataItem.position} />
                <input id='image' className={s.image} type='file' onChange={(e) => handleInputChange(e, 'image')} />
                <div className={s.text_wrapper}>
                    {dataItem.text &&
                        dataItem.text.map((item) => {
                            return (
                                <div key={item.key} className={s.input_text}>
                                    <input
                                        type='text'
                                        placeholder='Введіть текст'
                                        style={{ fontWeight: item.bold ? 'bold' : 'normal' }}
                                        onChange={(e) => handleInputChange(e, 'text', item.key)}
                                        value={item.value}
                                    />
                                    <div className={s.cross} onClick={() => handleRemoveText(item.key)}>
                                        X
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className={s.addText} onClick={() => addText(isBold)}>
                    <div className={s.text_name}>Додати текст</div>
                    <div className={s.text_plus}>
                        <PlusSvg />
                    </div>
                </div>
                <div className={s.isFat}>
                    <div className={s.text}>
                        Жирний текст
                    </div>
                    <input type="checkbox" checked={isBold} onChange={() => setIsBold(!isBold)} />
                </div>
                <div className={s.buttom} onClick={() => change()}>
                    <CustomButton text='Застосувати Зміни' noArrow />
                </div>
            </div>
        </form>
    );
}