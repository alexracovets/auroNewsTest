import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import CustomButton from "../../CustomButton/CustomButton";
import PlusSvg from "../PlusSvg/PlusSvg";
import CrossSvg from '../CrossSvg/CrossSvg';

import s from './PopUpAdd.module.scss';

PopUpAdd.propTypes = {
    dataRef: PropTypes.object.isRequired,
    setPopUpAdd: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired
};

export default function PopUpAdd({ dataRef, setPopUpAdd, updateList }) {
    const [isBold, setIsBold] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);
    const [dataItem, setDataItem] = useState({
        image: null,
        title: null,
        text: [],
        date: null,
        count: -1,
        key: null
    });

    const getDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        dataItem.date = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }

    const handleInputChange = async (e, name, key) => {
        if (name === 'image') {
            const file = e.target.files[0];
            const imageRef = ref(storage, `test/${file.name + v4()}`);

            try {
                await uploadBytes(imageRef, file);
                const downloadURL = await getDownloadURL(imageRef);
                setDataItem((prevData) => ({ ...prevData, ['image']: downloadURL }));
                setDataItem((prevData) => ({ ...prevData, ['key']: v4() }));
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

    const createItem = () => {
        getDate();
        if (
            dataItem.title &&
            dataItem.image
        ) {
            dataRef
                .child(dataItem.key)
                .set(dataItem)
                .then(() => {
                    updateList()
                })
                .then(() => {
                    setPopUpAdd(false);
                });
        }
    };

    return (
        <form className={s.add_muse}>
            <div className={s.muse_wrapper}>
                <div className={s.cross_main} onClick={() => setPopUpAdd(false)}>
                    <CrossSvg />
                </div>
                <div className={s.wrapper_label}>
                    <div className={s.download_wrapper} >
                        <div className={s.download} style={{ backgroundImage: imageLoad ? `url(${dataItem.image})` : 'none' }}></div>
                    </div>
                    <label htmlFor='image' className={s.label_image}>
                        <div className={s.status}>{imageLoad ? 'Фото завантажене' : 'Додати фото'}</div>
                    </label>
                </div>
                <input type='text' placeholder='Заголовок' onChange={(e) => handleInputChange(e, 'title')} />
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
                    <div className={s.text_plus}> <PlusSvg /> </div>
                </div>
                <div className={s.isFat}>
                    <div className={s.text}> Жирний текст </div>
                    <input type="checkbox" checked={isBold} onChange={() => setIsBold(!isBold)} />
                </div>
                <div className={s.buttom} onClick={() => createItem()}>
                    <CustomButton text='Створити Музей' noArrow />
                </div>
            </div>
        </form>
    );
}
