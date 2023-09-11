import s from './TitleBlock.module.scss';

export default function TitleBlock() {

    return (
        <div className={s.tittle_context}>
            <h2>
                Заголовок
            </h2>
            <div className={s.sub_title}>
                Опис. Менший короткий Текст
            </div>
        </div>
    )
}
