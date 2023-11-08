import PropTypes from 'prop-types';

import handleInputChangeEdit from '../../../../const/admin/handleInputChangeEdit';
import handleRemoveText from '../../../../const/admin/handleRemoveText';

import s from '../PopUpEdit.module.scss';

InputsNews.propTypes = {
    name: PropTypes.string,
    dataItem: PropTypes.object,
    imageLoad: PropTypes.bool,
    setDataItem: PropTypes.func,
    setImageLoad: PropTypes.func,
};

export default function InputsNews({ name, dataItem, imageLoad, setDataItem, setImageLoad }) {
    return (
        <>
            <div className={s.label}>
                <div className={s.label_wrapper} >
                    <div className={s.download} style={{ backgroundImage: imageLoad ? `url(${dataItem.image})` : 'none' }} ></div>
                </div>
                <label className={s.label_image} htmlFor='image'>
                    {imageLoad ? 'Фото завантажене' : 'Додати фото'}
                </label>
                <input id='image' className={s.image} type='file' onChange={(e) => handleInputChangeEdit(e, name, 'image', null, setDataItem, setImageLoad)} />
            </div>
            <input type='text' placeholder='Заголовок' onChange={(e) => handleInputChangeEdit(e, name, 'title', null, setDataItem, setImageLoad)} value={dataItem.title} />
            <input type='number' placeholder="Лайки" onChange={(e) => handleInputChangeEdit(e, name, 'likes', null, setDataItem, setImageLoad)} value={dataItem.likes} />
            <input type="text" placeholder="Дата створення" onChange={(e) => handleInputChangeEdit(e, name, 'date', null, setDataItem, setImageLoad)} value={dataItem.date} />
            <div className={s.texts}>
                {dataItem.text &&
                    dataItem.text.map((item) => {
                        return (
                            <div key={item.key} className={s.text}>
                                <input
                                    type='text'
                                    placeholder='Введіть текст'
                                    style={{ fontWeight: item.bold ? 'bold' : 'normal' }}
                                    onChange={(e) => handleInputChangeEdit(e, name, 'text', item.key, setDataItem, setImageLoad)}
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