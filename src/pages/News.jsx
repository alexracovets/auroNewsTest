import NewsBlock from "../Components/NewsBlock/NewsBlock";
import FeedBack from "../Components/FeedBack/FeedBack";

export default function News() {

    return (
        <>
            <style>
                {`
                    .feedback {
                        margin-top: -1.625rem;
                    }  
                    @media screen and (max-width: 767px) { 
                        .feedback {
                            display: none;
                        }  
                    }
                `}
            </style>
            <NewsBlock />
            <div className="feedback">
                <FeedBack />
            </div>
        </>
    )
}
