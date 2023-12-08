const textInputRemove = (keyToRemove, setDataItem) => {
    setDataItem((prevData) => {
        const newTextArray = prevData.text.filter((item) => item.key !== keyToRemove);
        return {
            ...prevData,
            text: newTextArray,
        };
    });
};

export default textInputRemove