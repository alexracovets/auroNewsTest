import { useEffect, useState } from 'react';
import { firestore } from '../../firebase';

import Pagination from './Pagination/Pagination';

import s from './MemorialBlock.module.scss';
import Memorials from './Memorials/Memorials';

export default function MemorialBlock() {

    const [memorials, setMemorials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [memoPerPage] = useState(3);

    const fetchData = async () => {
        try {
            const dbRef = firestore.ref('data/memorials');
            const snapshot = await dbRef.once('value');

            const data = snapshot.val();
            if (data) {
                const memorialsArray = Object.values(data);
                setMemorials(memorialsArray);
            }
        } catch (error) {
            console.error('Error fetching memorials:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const lastMemoIndex = currentPage * memoPerPage;
    const firstMemoIndex = lastMemoIndex - memoPerPage;
    const currentMemo = memorials.slice(firstMemoIndex, lastMemoIndex);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className={s.memo}>
            <div className={s.title}>
                Меморіал
            </div>
            <Memorials currentMemo={currentMemo} />
            <Pagination
                memoPerPage={memoPerPage}
                totalMemo={memorials.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </section>
    )
}
