import TitleBlock from "../Components/TitleBlock/TitleBlock";
import ShortNews from "../Components/ShortNews/ShortNews";
import ShortInfo from "../Components/ShortInfo/ShortInfo";
import ShortMuseum from "../Components/ShortMuseum/ShortMuseum";

export default function Home() {

    return (
        <>
            <section>
                <TitleBlock />
            </section>
            <section>
                <ShortNews />
            </section>
            <section>
                <ShortInfo />
            </section>
            <section>
                <ShortMuseum />
            </section>
        </>
    )
}
