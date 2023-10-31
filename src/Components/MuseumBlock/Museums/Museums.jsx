import PropTypes from 'prop-types';

import s from './Museums.module.scss';
import { useEffect, useState } from 'react';

Museums.propTypes = {
    currentMemo: PropTypes.array.isRequired,
    moreInfo: PropTypes.func.isRequired,
};

export default function Museums({ currentMemo }) {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        setMuseums(currentMemo)
    }, [currentMemo])


    return (
        <div className={s.museums}>
            {
                museums.map((item, index) => (
                    <div className={s.item} key={index}>
                        <div className={s.item__image} style={{ backgroundImage: `url(${item.image})` }}> </div>
                    </div>
                ))
            }
        </div>
    )
}
