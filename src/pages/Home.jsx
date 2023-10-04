import TitleBlock from "../Components/TitleBlock/TitleBlock";
import ShortNews from "../Components/ShortNews/ShortNews";
import ShortMuseum from "../Components/ShortMuseum/ShortMuseum";
import ShortInfo from "../Components/ShortInfo/ShortInfo";

export default function Home() {

    return (
        <>
            <TitleBlock />
            <ShortNews />
            <ShortInfo />
            <ShortMuseum />
        </>
    )
}
