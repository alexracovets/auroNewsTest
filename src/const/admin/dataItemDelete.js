const dataItemDelete = (id, name, update) => {

    fetch(import.meta.env.VITE_SERVER_PREFIX + `/${name.slice(0, -5)}/${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(() => update(name))
        .catch(error => console.error('Error:', error));
};

export default dataItemDelete;