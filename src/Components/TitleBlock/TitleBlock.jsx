import CustomCircle from '../CustomCircle/CustomCircle';

import s from './TitleBlock.module.scss';

export default function TitleBlock() {

    const circle = {
        radius: "19.375rem",
        position: {
            top: '-4.3125rem',
            bottom: 'auto',
            left: 'auto',
            right: '-4.3125rem'
        }
    }

    return (
        <section className={s.tittle_context}>
            <h2>
                Заголовок
            </h2>
            <div className={s.sub_title}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </div>
            <CustomCircle radius={circle.radius} position={circle.position} />
        </section>
    )
}
