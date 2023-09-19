import s from './Proposition.module.scss';

export default function Proposition() {

    return (
        <div className={s.proposition}>
            <div className={s.title}>
                Запитання та пропозиції:
            </div>
            <a className={s.phone} href="tel:+380675572716" >
                +380 67 557 27 16
            </a>
            <div className={s.name}>
                Альона Жигура
            </div>
            <div className={s.position}>
                Керівниця відділу КСВ
            </div>
        </div>
    )
}
