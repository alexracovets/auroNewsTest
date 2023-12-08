import PropTypes from 'prop-types';

import handleInputChange from '../../../../const/admin/handleInputChange';
import textInputRemove from '../../../../const/admin/textInputRemove';
import uploadImage from '../../../../const/admin/uploadImage';

import s from '../PopUpAdd.module.scss';

InputsMuseum.propTypes = {
    name: PropTypes.string,
    dataItem: PropTypes.object,
    imageLoad: PropTypes.bool,
    setDataItem: PropTypes.func,
    setImageLoad: PropTypes.func,
};

export default function InputsMuseum({ dataItem, imageLoad, setDataItem, setImageLoad }) {
    return (
        <>
            <div className={s.label}>
                <div className={s.label_wrapper} >
                    <div className={s.download} style={{ backgroundImage: imageLoad ? `url(${dataItem.image})` : 'none' }} ></div>
                </div>
                <label className={s.label_image} htmlFor='image'>
                    {imageLoad ? 'Фото завантажене' : 'Додати фото'}
                </label>
                <input id='image' className={s.image} type='file' onChange={(e) => uploadImage(e.target.files[0], setDataItem, setImageLoad)} />
            </div>
            <input type='text' placeholder='Заголовок' onChange={(e) => handleInputChange(e.target.value, 'title', setDataItem)} />
            <div className={s.texts}>
                {dataItem.text &&
                    dataItem.text.map((item) => {
                        return (
                            <div key={item.key} className={s.text}>
                                <input
                                    type='text'
                                    placeholder='Введіть текст'
                                    style={{ fontWeight: item.bold ? 'bold' : 'normal' }}
                                    onChange={(e) => handleInputChange(e.target.value, 'text', setDataItem, item.key)}
                                />
                                <div className={s.cross} onClick={() => textInputRemove(item.key, setDataItem)}>
                                    X
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
