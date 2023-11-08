import PropTypes from 'prop-types';

import SettingSvg from '../../SettingSvg/SettingSvg';
import CrossSvg from '../../CrossSvg/CrossSvg';
import Arrow from '../../Arrow/Arrow';

import deleteDataItem from '../../../../const/deleteDataItem';
import changePosition from '../../../../const/changePosition';
import editDataItem from '../../../../const/editDataItem';
import checkLength from '../../../../const/checkLength';
import fetchData from '../../../../const/fetchData';
import heart from '/img/heart.svg'

import s from '../../AdminNews.module.scss';

RenderNews.propTypes = {
    items: PropTypes.array,
    dataRef: PropTypes.object,
    setDataItem: PropTypes.func,
    setPopUpEdit: PropTypes.func,
    setItems: PropTypes.func
};

export default function RenderNews({ items, dataRef, setDataItem, setItems, setPopUpEdit }) {

    const fetchItem = () => fetchData(dataRef, setItems, true);

    const titles = {
        first: {
            value: 'Головна Новина',
            style: s.first
        },
        five: {
            value: 'Наступні 5',
            style: s.five
        },
        other: {
            value: 'Інші Новини',
            style: s.other
        }
    }

    const renderNews = (wrapper, start, end) => {
        return (
            <div className={s.wrapperBlock + ' ' + wrapper.style}>
                <div className={s.title}>
                    {wrapper.value}
                </div>
                <div className={s.items}>
                    {items.slice(start, end).map((item) => (
                        <div className={s.item} key={item.key}>
                            <div className={s.item_content}>
                                <div className={s.date}> {item.date} </div>
                                <div className={s.name}> {checkLength(item.title, 30)} </div>
                                <div className={s.like}>
                                    <img src={heart} alt="heart" />
                                    <div className={s.count}>{item.likes}</div>
                                </div>
                            </div>
                            <div className={s.item_setting}>
                                <div className={s.arrows}>
                                    <div className={s.arrow + ' ' + s.arrowBottom} onClick={() => changePosition(item, items, dataRef, fetchItem, true)}><Arrow /></div>
                                    <div className={s.arrow + ' ' + s.arrowTop} onClick={() => changePosition(item, items, dataRef, fetchItem, false)}><Arrow /></div>
                                </div>
                                <div className={s.setting} onClick={() => editDataItem(item, setDataItem, setPopUpEdit)}><SettingSvg /></div>
                                <div className={s.cross} onClick={() => deleteDataItem(item, dataRef, setItems)}><CrossSvg /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderNews(titles.first, 0, 1,)}
            {renderNews(titles.five, 1, 6)}
            {renderNews(titles.other, 6)}
        </>
    );
}
