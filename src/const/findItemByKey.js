const findItemByKey = (items, count) => { 
    return items.find(item => item.count === count);
}

export default findItemByKey;