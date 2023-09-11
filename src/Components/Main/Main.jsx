import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import PopupInfo from "../PopupInfo/PopupInfo";

export default function Main() {

    const popup = useSelector((state) => state.popup);

    return (
        <main>
            <Outlet />
            {popup.info && <PopupInfo data={popup.info} />}
        </main>
    )
}
