const dataItemAdd = (name, data, setPopUpAdd, update) => {
    fetch(import.meta.env.VITE_SERVER_PREFIX + `/${name.slice(0, -5)}`, {
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