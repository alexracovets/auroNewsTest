import { useState } from "react";

import AdminPanel from "../Components/AdminPanel/AdminPanel";
import AdminList from "../Components/AdminList/AdminList";
import AdminPassword from "../Components/AdminPassword/AdminPassword";

export default function Admin() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('news-list');
    const [passValid, setPassValid] = useState(false);
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            {
                passValid ? <>
                    <AdminPanel selectedMenuItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick} />
                    {selectedMenuItem === 'news-list' && <AdminList name={selectedMenuItem} title={'Додати Новину'} />}
                    {selectedMenuItem === 'memorial-list' && <AdminList name={selectedMenuItem} title={'Додати Меморіал'} />}
                    {selectedMenuItem === 'museum-list' && <AdminList name={selectedMenuItem} title={'Додати Музей'} />}
                </> : <AdminPassword setPassValid={setPassValid} />
            }
        </>
    )
}
