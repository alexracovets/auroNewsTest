import TitleBlock from "../Components/TitleBlock/TitleBlock";
import DescriptionBlock from "../Components/DescriptionBlock/DescriptionBlock";
import NewsShort from "../Components/NewsShort/NewsShort";
import ShortMuseum from "../Components/ShortMuseum/ShortMuseum";
import MemorialShort from "../Components/MemorialShort/MemorialShort";

export default function Home() {

    return (
        <>
            <TitleBlock />
            <DescriptionBlock />
            <MemorialShort />
            <NewsShort />
            <ShortMuseum />
        </>
    )
}
