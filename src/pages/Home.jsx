import TitleBlock from "../Components/TitleBlock/TitleBlock";
import NewsShort from "../Components/NewsShort/NewsShort";
import MuseumShort from "../Components/MuseumShort/MuseumShort";
import MemorialShort from "../Components/MemorialShort/MemorialShort";
import FeedBack from "../Components/FeedBack/FeedBack";

export default function Home() {

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
            <TitleBlock />
            <div className="mobile-wrapper">
                <NewsShort />
                <MuseumShort />
                <MemorialShort />
            </div>
            <div className="feedback">
                <FeedBack />
            </div>
        </>
    )
}
