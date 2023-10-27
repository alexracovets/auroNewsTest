import PropTypes from 'prop-types';

import CustomButton from '../../CustomButton/CustomButton';

import s from './Memorials.module.scss';
import { useEffect, useState } from 'react';

Memorials.propTypes = {
    currentMemo: PropTypes.array.isRequired,
    moreInfo: PropTypes.func.isRequired,
};

export default function Memorials({ currentMemo, moreInfo }) {
    const [memorials, setMemorials] = useState([]);

    useEffect(() => {
        setMemorials(currentMemo)
    }, [currentMemo])


    return (
        <div className={s.memorial}>
            {
                memorials.map((item, index) => (
                    <div className={s.item} key={index}>
                        <div className={s.item_left}>
                            <img src={item.image} alt="" />
                        </div>
                        <div className={s.item_rigth}>
                            <div className={s.title}>{item.title}</div>
                            <div className={s.item_name}>{item.name}</div>
                            <div className={s.item_age}>{item.age}</div>
                            <div className={s.item_position}>{item.position}</div>
                            <div className={s.btn} onClick={() => moreInfo(item)}>
                                <CustomButton text="додаткова інформація" noArrow />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
