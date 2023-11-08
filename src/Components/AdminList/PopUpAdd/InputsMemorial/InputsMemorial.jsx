import PropTypes from 'prop-types';

import handleInputChange from '../../../../const/admin/handleInputChange';
import handleRemoveText from '../../../../const/admin/handleRemoveText';

import s from '../PopUpAdd.module.scss';

InputsMemorial.propTypes = {
    name: PropTypes.string,
    dataItem: PropTypes.object,
    imageLoad: PropTypes.bool,
    setDataItem: PropTypes.func,
    setImageLoad: PropTypes.func,
};

export default function InputsMemorial({ name, dataItem, imageLoad, setDataItem, setImageLoad }) {
    return (
        <>
            <div className={s.label}>
                <div className={s.label_wrapper} >
                    <div className={s.download} style={{ backgroundImage: imageLoad ? `url(${dataItem.image})` : 'none' }} ></div>
                </div>
                <label className={s.label_image} htmlFor='image'>
                    {imageLoad ? 'Фото завантажене' : 'Додати фото'}
                </label>
                <input id='image' className={s.image} type='file' onChange={(e) => handleInputChange(e, name, 'image', null, setDataItem, setImageLoad)} />
            </div>
            <input type='text' placeholder='ПIП' onChange={(e) => handleInputChange(e, name, 'title', null, setDataItem, setImageLoad)} />
            <input type='text' placeholder='Роки життя' onChange={(e) => handleInputChange(e, name, 'age', null, setDataItem, setImageLoad)} />
            <input type='text' placeholder='Посада' onChange={(e) => handleInputChange(e, name, 'position', null, setDataItem, setImageLoad)} />
            <div className={s.texts}>
                {dataItem.text &&
                    dataItem.text.map((item) => {
                        return (
                            <div key={item.key} className={s.text}>
                                <input
                                    type='text'
                                    placeholder='Введіть текст'
                                    style={{ fontWeight: item.bold ? 'bold' : 'normal' }}
                                    onChange={(e) => handleInputChange(e, name, 'text', item.key, setDataItem, setImageLoad)}
                                />
                                <div className={s.cross} onClick={() => handleRemoveText(item.key, setDataItem)}>
                                    X
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
