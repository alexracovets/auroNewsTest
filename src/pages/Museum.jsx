import MuseumBlock from "../Components/MuseumBlock/MuseumBlock";
import FeedBack from "../Components/FeedBack/FeedBack";

export default function Museum() {

    return (
        <>
            <style>
                {`
                    @media screen and (max-width: 767px) { 
                        .feedback {
                            display: none;
                        }  
                    }
                `}
            </style>
            <MuseumBlock />
            <div className="feedback">
                <FeedBack />
            </div>
        </>
    )
}
