import TitleBlock from "../Components/TitleBlock/TitleBlock";
import DescriptionBlock from "../Components/DescriptionBlock/DescriptionBlock";
import NewsShort from "../Components/NewsShort/NewsShort";
import MuseumShort from "../Components/MuseumShort/MuseumShort";
import MemorialShort from "../Components/MemorialShort/MemorialShort";
import FeedBack from "../Components/FeedBack/FeedBack";

export default function Home() {

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
            <TitleBlock />
            <DescriptionBlock />
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
