import { firestore } from '../firebase';

const findPage = async (id, setData) => {
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
}

export default findPage;