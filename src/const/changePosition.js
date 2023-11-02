import findItemByKey from './findItemByKey';

const changePosition = async (item, items, dataRef, fetch, isBottom) => {

    const currentCount = item.count;
    const currentNews = findItemByKey(items, currentCount);

    const sortedItems = items.slice().sort((a, b) => a.count - b.count);
    const currentIndex = sortedItems.findIndex(item => item.count === currentCount);

    const findNeighbor = (index) => {
        const increment = isBottom ? 1 : -1;
        let neighbor = index + increment;
        return neighbor;
    };

    const neighborIndex = findNeighbor(currentIndex);

    if (neighborIndex < 0 || neighborIndex >= items.length) {
        return null;
    }

    const newCount = sortedItems[neighborIndex].count;
    const swapedNews = findItemByKey(items, newCount);

    try {
        await dataRef.child(currentNews.key).update({ count: newCount });
        await dataRef.child(swapedNews.key).update({ count: currentCount });
        await fetch();
    } catch (error) {
        console.error('Помилка при зміні позиції елементу:', error);
    }
};

export default changePosition