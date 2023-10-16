import { useParams } from 'react-router-dom';
import NewsDetailes from '../Components/NewsDetailes/NewsDetailes';

export default function NewsDetail() {
    const { id } = useParams();

    return (
        <NewsDetailes id={id} />
    )
}
