import { firestore } from '../firebase';

const updateLikes = async (key, setData, setLikeActive) => {
    try {
        const dbRef = firestore.ref('data/news');
        const snapshot = await dbRef.once('value');
        const data = snapshot.val();

        if (data) {
            const findItem = Object.values(data).find(item => item.key === key);
            const storageData = JSON.parse(localStorage.getItem('news')) || [];
            const findStorageIndex = storageData.findIndex(item => item === key);

            if (findItem) {
                if (findStorageIndex !== -1) {
                    storageData.splice(findStorageIndex, 1);
                    findItem.likes = Number(findItem.likes) - 1;
                } else {
                    storageData.push(key);
                    findItem.likes = Number(findItem.likes) + 1;
                }
                localStorage.setItem('news', JSON.stringify(storageData));
                await dbRef.set(data);
                setData(findItem);
                const storageItem = JSON.parse(localStorage.getItem('news')) || [];
                setLikeActive(storageItem.includes(key))
            }
        }
    } catch (error) {
        console.error('Помилка оновлення лайків:', error);
    }
};

export default updateLikes;