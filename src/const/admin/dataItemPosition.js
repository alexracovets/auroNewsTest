const dataItemPosition = (item, items, name, isPluse, update) => {
    let currentItem = item;
    let changedItem = null;

    const changePosittions = async (current, chaged) => {
        try {
            await fetch(import.meta.env.VITE_SERVER_PREFIX + `/${name.slice(0, -5)}/${current.key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(current)
            });
            await fetch(import.meta.env.VITE_SERVER_PREFIX + `/${name.slice(0, -5)}/${chaged.key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chaged)
            });
            update(name);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    items.forEach((item) => {
        if ((isPluse && item.count > currentItem.count) || (!isPluse && item.count < currentItem.count)) {
            if (!changedItem || Math.abs(item.count - currentItem.count) < Math.abs(changedItem.count - currentItem.count)) {
                changedItem = item;
            }
        }
    });

    if (changedItem) {
        const newCurrentCount = changedItem.count;
        const newChangedCount = item.count;

        currentItem.count = newCurrentCount;
        changedItem.count = newChangedCount;

        return changePosittions(currentItem, changedItem);
    } else return null


};

export default dataItemPosition;