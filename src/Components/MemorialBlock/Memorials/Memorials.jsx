import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import s from './Memorials.module.scss';
import Memorial from './Memorial/Memorial';


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
            {memorials.length > 0 ?
                memorials.map((item, index) => <Memorial item={item} moreInfo={moreInfo} key={index} />) :
                <div className={s.item + ' ' + s.noResault}> Пошук не дав результатів </div>
            }
        </div>
    )
}
