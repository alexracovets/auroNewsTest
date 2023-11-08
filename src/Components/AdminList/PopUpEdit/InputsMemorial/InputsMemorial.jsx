import PropTypes from 'prop-types';

import handleInputChangeEdit from '../../../../const/admin/handleInputChangeEdit';
import handleRemoveText from '../../../../const/admin/handleRemoveText';

import s from '../PopUpEdit.module.scss';

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
                <input id='image' className={s.image} type='file' onChange={(e) => handleInputChangeEdit(e, name, dataItem, 'image', null, setDataItem, setImageLoad)} />
            </div>
            <input type='text' placeholder='ПIП' onChange={(e) => handleInputChangeEdit(e, name, dataItem, 'title', null, setDataItem, setImageLoad)} value={dataItem.title} />
            <input type='text' placeholder='Роки життя' onChange={(e) => handleInputChangeEdit(e, name, dataItem, 'age', null, setDataItem, setImageLoad)} value={dataItem.age} />
            <input type='text' placeholder='Посада' onChange={(e) => handleInputChangeEdit(e, name, dataItem, 'position', null, setDataItem, setImageLoad)} value={dataItem.position} />
            <div className={s.texts}>
                {dataItem.text &&
                    dataItem.text.map((item) => {
                        return (
                            <div key={item.key} className={s.text}>
                                <input
                                    type='text'
                                    placeholder='Введіть текст'
                                    style={{ fontWeight: item.bold ? 'bold' : 'normal' }}
                                    onChange={(e) => handleInputChangeEdit(e, name, dataItem, 'text', item.key, setDataItem, setImageLoad)}
                                    value={item.value}
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
