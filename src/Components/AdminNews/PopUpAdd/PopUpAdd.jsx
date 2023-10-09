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
    fetchData: PropTypes.func.isRequired,
    setPoUoAdded: PropTypes.func.isRequired,
};

export default function PopUpAdd({ dataRef, fetchData, setPoUoAdded }) {
    const [isBold, setIsBold] = useState(true);
    const [imageLoad, setImageLoad] = useState(false);
    const [newsData, setNewslData] = useState({
        title: null,
        image: null,
        text: [],
        likes: 0,
        key: null
    });

    const handleInputChange = async (e, name, key) => {
        if (name === 'image') {
            const file = e.target.files[0];
            const imageRef = ref(storage, `news/${file.name + v4()}`);

            try {
                await uploadBytes(imageRef, file);
                const downloadURL = await getDownloadURL(imageRef);
                setNewslData((prevData) => ({ ...prevData, ['image']: downloadURL }));
                setNewslData((prevData) => ({ ...prevData, ['key']: v4() }));
                setImageLoad(true);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        } else if (name === 'text') {
            const { value } = e.target;
            setNewslData((prevData) => {
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
            setNewslData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleRemoveText = (keyToRemove) => {
        setNewslData((prevData) => {
            const newTextArray = prevData.text.filter((item) => item.key !== keyToRemove);
            return {
                ...prevData,
                text: newTextArray,
            };
        });
    };

    const addText = (bold) => {
        const key = v4();
        setNewslData((prevData) => ({
            ...prevData,
            text: [...prevData.text, { key, 'value': '', 'bold': bold }],
        }));
    };

    const createMemorial = () => {
        if (
            newsData.title &&
            newsData.image
        ) {
            dataRef
                .child(newsData.key)
                .set(newsData)
                .then(() => {
                    fetchData();
                    setPoUoAdded(false);
                });
        }
    };

    return (
        <form className={s.add_memo}>
            <div className={s.memo_wrapper}>
                <div className={s.cross_main} onClick={() => setPoUoAdded(false)}>
                    <CrossSvg />
                </div>
                <div className={s.wrapper_label}>
                    <div
                        className={s.download_wrapper}
                    >
                        <div
                            className={s.download}
                            style={{ backgroundImage: imageLoad ? `url(${newsData.image})` : 'none' }}
                        ></div>
                    </div>
                    <label htmlFor='image' className={s.label_image}>
                        <div className={s.status}>{imageLoad ? 'Фото завантажене' : 'Додати фото'}</div>
                    </label>
                </div>
                <input type='text' placeholder='Заголовок' onChange={(e) => handleInputChange(e, 'title')} />
                <input id='image' className={s.image} type='file' onChange={(e) => handleInputChange(e, 'image')} />
                <div className={s.text_wrapper}>
                    {newsData.text &&
                        newsData.text.map((item) => {
                            return (
                                <div key={item.key} className={s.input_text}>
                                    <input
                                        type='text'
                                        placeholder='Роки життя'
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
                <div className={s.buttom} onClick={() => createMemorial()}>
                    <CustomButton text='Створити Меморіал' noArrow />
                </div>
            </div>
        </form>
    );
}
