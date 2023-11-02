const updateList = async (dataRef, fetch) => {
    try {
        const snapshot = await dataRef.once('value');
        const data = snapshot.val();

        const elementsToUpdate = Object.keys(data).filter(key => data[key].count === -1);

        const updateElement = async (key, increment) => {
            const newCount = data[key].count + increment;
            await dataRef.child(key).update({ count: newCount });

            // Перевіряємо чи існують дублікати для нового значення count
            const duplicateKeys = Object.keys(data).filter(k => data[k].count === newCount);

            // Видаляємо зі списку той ключ, який вже був оновлений, щоб уникнути зациклення
            const remainingKeys = duplicateKeys.filter(dupKey => dupKey !== key);

            // Якщо є ще елементи для оновлення, рекурсивно викликаємо для них
            if (remainingKeys.length > 0) {
                await Promise.all(remainingKeys.map(async dupKey => updateElement(dupKey, 1)));
            }
        };

        // Оновлюємо елементи, які мають count === -1
        await Promise.all(elementsToUpdate.map(async key => updateElement(key, 1)));

        // Після оновлення перевіряємо всі значення count та робимо їх унікальними
        const uniqueCounts = Array.from(new Set(Object.values(data).map(item => item.count)));
        const updatePromises = uniqueCounts.map(async count => {
            const keysWithCount = Object.keys(data).filter(key => data[key].count === count);
            for (let i = 1; i < keysWithCount.length; i++) {
                await updateElement(keysWithCount[i], 1);
            }
        });

        await Promise.all(updatePromises);

        await fetch();
    } catch (error) {
        console.error('Помилка при оновленні списку:', error);
    }
};

export default updateList;