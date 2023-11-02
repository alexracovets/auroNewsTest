import findItemByKey from './findItemByKey';

const changePosition = async (item, items, dataRef, fetch, isBottom) => {

    const currentCount = item.count;
    const currentNews = findItemByKey(items, currentCount);

    const sortedItems = items.slice().sort((a, b) => a.count - b.count);
    const currentIndex = sortedItems.findIndex(item => item.count === currentCount);

    // Знаходимо індекс найближчого сусіднього елемента
    const findNeighbor = (index) => {
        const increment = isBottom ? 1 : -1;
        let neighbor = index + increment;
        return neighbor;
    };

    const neighborIndex = findNeighbor(currentIndex);

    if (neighborIndex < 0 || neighborIndex >= items.length) {
        // Якщо виходить за межі масиву, повертаємо null
        return null;
    }

    const newCount = sortedItems[neighborIndex].count;
    const swapedNews = findItemByKey(items, newCount);

    try {
        // Оновлення даних в Firebase
        await dataRef.child(currentNews.key).update({ count: newCount });
        await dataRef.child(swapedNews.key).update({ count: currentCount });
        await fetch();
    } catch (error) {
        console.error('Помилка при оновленні даних в Firebase:', error);
    }
};

export default changePosition