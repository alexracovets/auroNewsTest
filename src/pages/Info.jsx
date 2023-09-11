import SmallInfo from "../Components/SmallInfo/SmallInfo";

export default function Info() {

    const infoList = [
        {
            photo: 'Фото 1',
            text: 'Короткий Опис 1'
        },
        {
            photo: 'Фото 2',
            text: 'Короткий Опис 2'
        },
        {
            photo: 'Фото 3',
            text: 'Короткий Опис 3'
        }
    ]

    return (
        <>
            {
                infoList.map((item, index) => (
                    <section key={index}>
                        <SmallInfo info={item} />
                    </section>
                ))
            }
        </>
    )
}
