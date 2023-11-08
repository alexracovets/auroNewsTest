import { useState } from "react";

import AdminPanel from "../Components/AdminPanel/AdminPanel";
import AdminList from "../Components/AdminList/AdminList";

export default function Admin() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('');

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <section>
            <AdminPanel selectedMenuItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick} />
            {selectedMenuItem === 'news' && <AdminList name={selectedMenuItem} title={'Додати Новину'} />}
            {selectedMenuItem === 'memorial' && <AdminList name={selectedMenuItem} title={'Додати Меморіал'} />}
            {selectedMenuItem === 'museum' && <AdminList name={selectedMenuItem} title={'Додати Музей'} />}
        </section>
    )
}
