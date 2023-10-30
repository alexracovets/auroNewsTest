import FeedBack from '../FeedBack/FeedBack';

import s from './ContactsWrapper.module.scss';

export default function ContactsWrapper() {

    return (
        <div className={s.ContactsWrapper}>
            <FeedBack />
        </div>
    )
}
