const handleInputChange = (value, name, setData) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
};

export default handleInputChange;