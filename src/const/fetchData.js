const fetchData = async (store, func, sort) => {
    try {
        const snapshot = await store.once('value');

        const data = snapshot.val();
        if (data) {
            const memorialsArray = Object.values(data);
            sort ? func(memorialsArray.sort((a, b) => a.count - b.count)) : func(memorialsArray)
        }
    } catch (error) {
        console.error('Error fetching memorials:', error);
    }
};

export default fetchData