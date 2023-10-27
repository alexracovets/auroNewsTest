import s from './FeedBack.module.scss';

export default function FeedBack() {

    return (
        <section className={s.FeedBack}>
            <h3 className={s.title}>
                Контакти
            </h3>
            <div className={s.contact_block_second}>
                <div className={s.left}>
                    <div className={s.title}>
                        З питань отримання безкоштовної юридичної допомоги:
                    </div>
                    <div className={s.tel}>
                        лінія підтримки +380 67 826 00 00
                        (після виклику натиснути 3)
                    </div>
                </div>
                <div className={s.right}>
                    <div className={s.title}>
                        З юридичних питань і психологічної підтримки звертайтеся на лінію підтримки Ветеран Хаб за номером
                    </div>
                    <div className={s.tel}>
                        +380 67 348 28 68
                    </div>
                </div>
            </div>
            <div className={s.contact_block_first}>
                <div className={s.left}>
                    <div className={s.title}>
                        Запитання та пропозиції:
                    </div>
                    <div className={s.tell}>
                        +380 67 557 27 16
                    </div>
                    <div className={s.description}>
                        Керівниця відділу КСВ
                    </div>
                </div>
                <div className={s.right}>
                    <div className={s.title}>
                        Контакти менеджерок КСВ:
                    </div>
                    <ul className={s.list}>
                        <li>
                            <a href="tel:+380675572716">+380 67 557 27 16</a>
                            <div className={s.text}>Альона Жигура</div>
                        </li>
                        <li>
                            <a href="tel:+380956252907">+380 95 625 29 07</a>
                            <div className={s.text}>Марія Яременко</div>
                        </li>
                        <li>
                            <a href="tel:+380671746363">+380 67 174 63 63</a>
                            <div className={s.text}>Надія Грисенко</div>
                        </li>
                        <li>
                            <a href="tel:+380664746618">+380 66 474 66 18</a>
                            <div className={s.text}>Марина Мельничук</div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
