import MemorialBlock from "../Components/MemorialBlock/MemorialBlock";
import FeedBack from "../Components/FeedBack/FeedBack";

export default function Memorial() {

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
            <MemorialBlock />
            <div className="feedback">
                <FeedBack />
            </div>
        </>
    )
}
