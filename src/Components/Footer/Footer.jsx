import s from './Footer.module.scss';
import MenuFooter from './MenuFooter/MenuFooter';
import Proposition from './Proposition/Proposition';
import CustomCircle from '../CustomCircle/CustomCircle';

export default function Footer() {

    const circle = {
        radius: "15.625rem",
        position: {
            top: '-4.3125rem',
            bottom: 'auto',
            left: 'auto',
            right: '-4.3125rem'
        }
    }

    return (
        <footer className={s.footer}>
            <MenuFooter />
            <Proposition />
            <CustomCircle radius={circle.radius} position={circle.position} />
        </footer>
    )
}
