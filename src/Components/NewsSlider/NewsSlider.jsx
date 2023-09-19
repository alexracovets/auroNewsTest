import CustomSlider from "../CustomSlider/CustomSlider";

import s from './NewsSlider.module.scss';

export default function NewsSlider() {

    const museumList = [
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
        {
            title: 'Аврора передала 200 рацій ЗСУ',
            photo: '/img/news/news1.jpg',
            description: [
                "Однією з найактуальніших потреб української армії є рації. Адже надійний зв’язок, який не підведе у складну хвилину, допомагає не тільки успішно виконувати бойові завдання, а й рятувати життя.",
                "Найчастіше бойові загони розсіюються на місцевості. І зв’язок військових по рації може стати порятунком, забезпечити зміцнення позицій й допомогти виявити зосередження противника."
            ]
        },
    ]

    const renderSlide = () => {
        return museumList.map((news, index) => (
            <div className={s.slide} key={index}>
                <div className={s.wrapperSlider}>
                    <h3>{news.title}</h3>
                    <div className={s.wrapper}>
                        <div className={s.image}>
                            <img src={news.photo} alt="news" />
                        </div>
                        <div className={s.content}>
                            <div className={s.description}>
                                {news.description.map((item, index) => (
                                    <p key={index}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                            <button className={s.read}>читати</button>
                        </div>
                    </div>
                </div>

            </div>
        ));
    };
    return (
        <section className={s.newsSlider}>
            <div className={s.slider}>
                <CustomSlider renderSlide={renderSlide} />
            </div>
        </section>
    )
}
