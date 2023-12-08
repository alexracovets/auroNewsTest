const dataItemAdd = (name, data, setPopUpAdd, update) => {
    fetch(`http://localhost:3000/${name.slice(0, -5)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(() => {
            update(name);
            setPopUpAdd(false);
        })
};

export default dataItemAdd;