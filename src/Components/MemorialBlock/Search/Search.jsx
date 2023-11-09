import PropTypes from 'prop-types';

import s from '../MemorialBlock.module.scss';

Search.propTypes = {
    setValue: PropTypes.func,
};

export default function Search({ setValue }) {

    return (
        <form className={s.form}>
            <input
                type="text"
                placeholder='Пошук за ПІП'
                className={s.search}
                onChange={(event) => setValue(event.target.value)}
            />
        </form>
    )
}
