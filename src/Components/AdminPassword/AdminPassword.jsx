import PropTypes from 'prop-types';

import s from './AdminPassword.module.scss';
import { useState } from 'react';

AdminPassword.propTypes = {
    setPassValid: PropTypes.func.isRequired,
};
export default function AdminPassword({ setPassValid }) {
    const [handleInput, setHandleInput] = useState('');
    const [isWrong, setIsrong] = useState(false);

    const animError = () => {
        setIsrong(true);
        setTimeout(() => {
            setIsrong(false);
        }, 300)
    }

    const checkPass = () => {
        handleInput === import.meta.env.VITE_ADMIN_PASSWORD ? setPassValid(true) : animError();
    }

    return (
        <div className={s.checkPass}>
            <input type="password" className={isWrong ? s.input + ' ' + s.error : s.input} placeholder="Введіть пароль" onChange={(e) => setHandleInput(e.target.value)} value={handleInput} />
            <button className={s.btn} onClick={() => checkPass()}>OK</button>
        </div>
    )
}
