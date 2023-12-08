const handleInputChange = (value, name, setData, key) => { 
    if (name === 'text') {
        setData((prevData) => {
            const newTextArray = prevData.text.map((item) =>
                item.key === key ? { ...item, 'value': value } : item
            );
            return {
                ...prevData,
                text: newTextArray,
            };
        });
    } else {
        setData((prevData) => ({ ...prevData, [name]: value }));
    }
};

export default handleInputChange;