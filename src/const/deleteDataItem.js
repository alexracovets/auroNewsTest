const deleteDataItem = async (keyItem, data, funcState) => {
    try {
        const snapshot = await data.orderByChild('key').equalTo(keyItem).once('value');
        const items = snapshot.val();

        if (items) {
            const itemKey = Object.keys(items)[0];
            await data.child(itemKey).remove();
        }

        funcState(prevData => prevData.filter(item => item.key !== keyItem));
    } catch (error) {
        console.error('Помилка видалення елементу:', error);
    }
};

export default deleteDataItem;