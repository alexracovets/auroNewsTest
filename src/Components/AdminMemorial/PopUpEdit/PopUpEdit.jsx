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
    memo: PropTypes.object.isRequired,
    setPopUpEdit: PropTypes.func.isRequired
};

export default function PopUpEdit({ dataRef, fetchData, memo, setPopUpEdit }) {
    const [isBold, setIsBold] = useState(true);
    const [imageLoad, setImageLoad] = useState(true);
    const [memorialData, setMemorialData] = useState({
        title: memo.title,
        image: memo.image,
        name: memo.name,
        age: memo.age,
        position: memo.position,
        text: memo.text || [],
        key: memo.key
    });

    const handleInputChange = async (e, name, key) => {
        if (name === 'image') {
            const file = e.target.files[0];
            const imageRef = ref(storage, `test/${file.name + v4()}`);

            try {
                await uploadBytes(imageRef, file);
                const downloadURL = await getDownloadURL(imageRef);
                setMemorialData((prevData) => ({ ...prevData, ['image']: downloadURL }));
                setImageLoad(true);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        } else if (name === 'text') {
            const { value } = e.target;
            setMemorialData((prevData) => {
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
            setMemorialData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleRemoveText = (keyToRemove) => {
        setMemorialData((prevData) => {
            const newTextArray = prevData.text.filter((item) => item.key !== keyToRemove);
            return {
                ...prevData,
                text: newTextArray,
            };
        });
    };

    const addText = (bold) => {
        const key = v4();
        setMemorialData((prevData) => ({
            ...prevData,
            text: Array.isArray(prevData.text) ? [...prevData.text, { key, 'value': '', 'bold': bold }] : [{ key, 'value': '', 'bold': bold }],
        }));
    };

    const change = async () => {
        try {
            await dataRef.child(memorialData.key).set(memorialData);
            fetchData();
            setPopUpEdit(false);
        } catch (error) {
            console.error('Помилка зміни меморіалу:', error);
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
                            style={{ backgroundImage: imageLoad ? `url(${memorialData.image})` : 'none' }}
                        ></div>
                    </div>
                    <label htmlFor='image' className={s.label_image}>
                        <div className={s.status}>{imageLoad ? 'Фото завантажене' : 'Додати фото'}</div>
                    </label>
                </div>
                <input type='text' placeholder='Заголовок' onChange={(e) => handleInputChange(e, 'title')} value={memorialData.title} />
                <input type='text' placeholder='ПIП' onChange={(e) => handleInputChange(e, 'name')} value={memorialData.name} />
                <input type='text' placeholder='Роки життя' onChange={(e) => handleInputChange(e, 'age')} value={memorialData.age} />
                <input type='text' placeholder='Посада' onChange={(e) => handleInputChange(e, 'position')} value={memorialData.position} />
                <input id='image' className={s.image} type='file' onChange={(e) => handleInputChange(e, 'image')} />
                <div className={s.text_wrapper}>
                    {memorialData.text &&
                        memorialData.text.map((item) => {
                            return (
                                <div key={item.key} className={s.input_text}>
                                    <input
                                        type='text'
                                        placeholder='Роки життя'
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