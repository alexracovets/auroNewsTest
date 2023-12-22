const dataItemChange = (name, dataItem, update, setPopUpEdit) => {
    fetch(import.meta.env.VITE_SERVER_PREFIX + `/${name.slice(0, -5)}/${dataItem.key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataItem)
    })
        .then(response => { response.json() })
        .then(() => {
            update(name);
            setPopUpEdit(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

export default dataItemChange;