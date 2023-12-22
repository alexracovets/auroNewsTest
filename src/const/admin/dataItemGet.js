const dataItemGet = (id, setData) => {
    fetch(import.meta.env.VITE_SERVER_PREFIX + `/news/${id}`)
        .then(response => response.json())
        .then(data => {
            const rest = data;
            setData(rest)
        })
        .catch(error => console.error('Error:', error));
};

export default dataItemGet;