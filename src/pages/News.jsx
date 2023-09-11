import SmallNews from "../Components/SmallNews/SmallNews";

export default function News() {

    const newsList = [
        {
            description: 'Опис Новина 1',
            photo: 'Фото 1',
            text: 'Короткий Опис 1',
            likes: 10,
            id: 1
        },
        {
            description: 'Опис Новина 2',
            photo: 'Фото 2',
            text: 'Короткий Опис 2',
            likes: 7,
            id: 2
        },
        {
            description: 'Опис Новина 3',
            photo: 'Фото 3',
            text: 'Короткий Опис 3',
            likes: 21,
            id: 3
        }
    ]

    return (
        <>
            {
                newsList.map((item, index) => (
                    <section key={index}>
                        <SmallNews news={item} />
                    </section>
                ))
            }
        </>
    )
}
