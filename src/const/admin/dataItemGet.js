const dataItemGet = (id, setData) => {
    fetch(`http://localhost:3000/news/${id}`)
        .then(response => response.json())
        .then(data => {
            const rest = data;
            setData(rest)
        })
        .catch(error => console.error('Error:', error));
};

export default dataItemGet;