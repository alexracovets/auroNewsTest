import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { firestore } from '../firebase';

export default function NewsDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null)
    const fetchData = async () => {
        try {
            const dbRef = firestore.ref('data/news');
            const snapshot = await dbRef.once('value');
            const data = snapshot.val();

            if (data) {
                const findItem = Object.values(data).find(item => item.key === id);
                setData(findItem);
            }
        } catch (error) {
            console.error('Error fetching memorials:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            {
                data ? < h2 > Сторінка новини {id}</h2> : "сторінки не існує"
            }

        </div >
    )
}
