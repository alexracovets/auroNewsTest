const deleteDataItem = async (keyItem, data, funcState) => {
    try {
        // Отримати знайдений об'єкт за ключем
        const snapshot = await data.orderByChild('key').equalTo(keyItem).once('value');
        const memos = snapshot.val();

        // Якщо знайдено об'єкт, видалити його
        if (memos) {
            const memoKey = Object.keys(memos)[0];
            await data.child(memoKey).remove();
        }

        funcState(prevMemorials => prevMemorials.filter(memo => memo.key !== keyItem));
    } catch (error) {
        console.error('Помилка видалення меморіалу:', error);
    }
};

export default deleteDataItem;