import { useParams } from 'react-router-dom';

import NewsDetailes from '../Components/NewsDetailes/NewsDetailes';
import FeedBack from "../Components/FeedBack/FeedBack";

export default function NewsDetail() {
    const { id } = useParams();

    return (
        <>
            <style>
                {`
                    @media screen and (max-width: 768px) { 
                        .feedback {
                            display: none;
                        }  
                    }
                `}
            </style>
            <NewsDetailes id={id} />
            <div className="feedback">
                <FeedBack />
            </div>
        </>

    )
}
