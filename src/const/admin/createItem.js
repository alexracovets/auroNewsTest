const createItem = (data, validParam, dataRef, updateList, setPopUpAdd) => {
    const isValid = validParam.every(param => Object.prototype.hasOwnProperty.call(data, param)) && data.key !== null && data.key !== undefined;

    if (isValid) {
        dataRef
            .child(data.key)
            .set(data)
            .then(() => {
                updateList();
            })
            .then(() => {
                setPopUpAdd(false);
            });
    } else return null
};

export default createItem;