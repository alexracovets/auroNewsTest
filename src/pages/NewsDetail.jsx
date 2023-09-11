import { useParams } from 'react-router-dom';

export default function NewsDetail() {
    const { id } = useParams();

    return (
        <div>
            <h2>Сторінка новини {id}</h2>
        </div>
    )
}
