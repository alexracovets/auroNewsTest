const changeItem = async (data, dataRef, fetchData, setPopUpEdit) => {
    try {
        await dataRef.child(data.key).update(data);
        fetchData();
        setPopUpEdit(false);
    } catch (error) {
        console.error('Помилка зміни новини:', error);
    }
};

export default changeItem;