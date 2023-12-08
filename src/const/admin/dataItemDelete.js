const dataItemDelete = (id, name) => {

    fetch(`http://localhost:3000/${name.slice(0, -5)}/${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
};

export default dataItemDelete;