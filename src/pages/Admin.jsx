import { useState } from "react";
import AdminMemorial from "../Components/AdminMemorial/AdminMemorial";
import AdminPanel from "../Components/AdminPanel/AdminPanel";
import AdminNews from "../Components/AdminNews/AdminNews";


export default function Admin() {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <section>
            <AdminPanel onMenuItemClick={handleMenuItemClick} />
            {selectedMenuItem === 'memorial' && <AdminMemorial />}
            {selectedMenuItem === 'news' && <AdminNews />}
        </section>
    )
}