import CustomBlock from "../CustomBlock/CustomBlock";

export default function ShortInfo() {
    const data = {
        img: '',
        title: 'Інформація',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        btn: 'читати більше',
        reverse: false,
        link: '/info',
        circle: {
            radius: "20.6875",
            position: {
                top: '-4.3125rem',
                bottom: 'auto',
                left: '0',
                right: 'auto'
            }
        }
    }

    return (
        <CustomBlock data={data} />
    )
}
