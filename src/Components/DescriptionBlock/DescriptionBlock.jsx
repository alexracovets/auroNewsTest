

import s from './DescriptionBlock.module.scss';

export default function DescriptionBlock() {
    return (
        <section className={s.DescriptionBlock}>
            <h3 className={s.title}>
                Цей сайт створений для того, щоб назавжди закарбувати у пам’яті <b>часи незламності</b>.
            </h3>
            <div className={s.description}>
                <div className={s.item}>
                    <b>Зібрати</b> в одному місці всі нагороди та трофеї цієї війни, які ми отримали на знак подяки.
                </div>
                <div className={s.item}>
                    <b>Зберегти</b> неймовірні історії наших аврорівців, які пережили обстріли, окупацію, евакуацію, втрати, блекаути і стали ще сильнішими.
                </div>
            </div>
        </section>
    )
}
