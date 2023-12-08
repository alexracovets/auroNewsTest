const dataItemDelete = (id, name, update) => {

    fetch(`http://localhost:3000/${name.slice(0, -5)}/${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(() => update(name))
        .catch(error => console.error('Error:', error));
};

export default dataItemDelete;