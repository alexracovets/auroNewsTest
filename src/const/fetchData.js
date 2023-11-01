const fetchData = async (store, func) => {
    try {
        const snapshot = await store.once('value');

        const data = snapshot.val();
        if (data) {
            const memorialsArray = Object.values(data);
            func(memorialsArray);
        }
    } catch (error) {
        console.error('Error fetching memorials:', error);
    }
};

export default fetchData