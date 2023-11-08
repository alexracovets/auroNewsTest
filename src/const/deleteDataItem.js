
import deleteImage from './admin/deleteImage';

const deleteDataItem = async (element, data, funcState) => {

    try {
        // Видалення елементу з бази даних
        const snapshot = await data.orderByChild('key').equalTo(element.key).once('value');
        const items = snapshot.val();

        if (items) {
            const itemKey = Object.keys(items)[0];
            await deleteImage(element);
            await data.child(itemKey).remove();
        }

        // Оновлення стану
        funcState(prevData => prevData.filter(item => item.key !== element.key));

    } catch (error) {
        console.error('Помилка видалення елементу:', error);
    }
};

export default deleteDataItem;
