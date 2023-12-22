const dataItemLikes = (key, getData) => {

    const storageData = JSON.parse(localStorage.getItem('news'));
    const findStorageIndex = storageData.indexOf(key);
    const isPlus = findStorageIndex === -1 ? true : false;

    fetch(import.meta.env.VITE_SERVER_PREFIX + `/news/like/${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ like: isPlus })
    })
        .then(response => response.json())
        .then(() => {
            isPlus ? storageData.push(key) : storageData.splice(findStorageIndex, 1);
            localStorage.setItem('news', JSON.stringify(storageData));
            getData(key);
        })
        .catch(error => console.error('Error:', error));
};

export default dataItemLikes;