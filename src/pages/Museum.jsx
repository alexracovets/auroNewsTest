import SmallMuseum from "../Components/SmallMuseum/SmallMuseum";

export default function Museum() {

    const museumList = [
        {
            description: 'Опис 1',
            photo: 'Фото 1',
            text: 'Короткий Опис 1'
        },
        {
            description: 'Опис 2',
            photo: 'Фото 2',
            text: 'Короткий Опис 2'
        },
        {
            description: 'Опис 3',
            photo: 'Фото 3',
            text: 'Короткий Опис 3'
        }
    ]

    return (
        <>
            {
                museumList.map((item, index) => (
                    <section key={index}>
                        <SmallMuseum museum={item} />
                    </section>
                ))
            }
        </>
    )
}
