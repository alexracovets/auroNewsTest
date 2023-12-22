const dataFetch = (path, setState) => {
    fetch(import.meta.env.VITE_SERVER_PREFIX + `/${path}`)
        .then(response => response.json())
        .then(data => {
            const rest = Object.values(data);
            setState(rest.sort((a, b) => a.count - b.count));
        })
        .catch(error => console.error('Error:', error));
};

export default dataFetch;