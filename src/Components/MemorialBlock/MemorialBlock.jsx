import { useEffect, useState } from 'react';

import Search from './Search/Search';
import SliderWrapper from './SliderWrapper/SliderWrapper';
import firestoreRef from '../../const/firestoreRef';
import fetchData from '../../const/fetchData';
import MemorialPopUp from './MemorialPopUp/MemorialPopUp';
import Pagination from './Pagination/Pagination';
import Memorials from './Memorials/Memorials';

import s from './MemorialBlock.module.scss';

export default function MemorialBlock() {

    const [memorials, setMemorials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [memoPerPage] = useState(3);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [value, setValue] = useState('');

    const fitered = memorials.filter(memo => {
        return memo.title.toLowerCase().includes(value.toLowerCase())
    });

    const dataRef = firestoreRef(`/data/memorial`);

    const lastMemoIndex = currentPage * memoPerPage;
    const firstMemoIndex = lastMemoIndex - memoPerPage;
    const currentMemo = fitered.slice(firstMemoIndex, lastMemoIndex);

    const moreInfo = (memorial) => {
        setSelectedItem(memorial);
        setIsPopUpOpen(true);
    }

    const closePopUp = () => {
        setSelectedItem(null);
        setIsPopUpOpen(false);
    }

    useEffect(() => {
        fetchData(dataRef, setMemorials, true)
    }, [dataRef]);

    return (
        <section className={s.memo}>
            <div className={s.title}> Наші Герої </div>
            <Search setValue={setValue} />
            <Memorials currentMemo={currentMemo} moreInfo={moreInfo} />
            <Pagination memoPerPage={memoPerPage} totalMemo={memorials.length} paginate={setCurrentPage} currentPage={currentPage} />
            <SliderWrapper fitered={fitered} moreInfo={moreInfo} />
            <MemorialPopUp isPopUpOpen={isPopUpOpen} selectedItem={selectedItem} closePopUp={closePopUp} />
        </section>
    )
}
