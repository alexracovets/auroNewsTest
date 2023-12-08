import { v4 } from 'uuid';

const textInputAdd = (bold, setDataItem) => {
    const key = v4();
    setDataItem((prevData) => ({
        ...prevData,
        text: [...prevData.text, { key, 'value': '', 'bold': bold }],
    }));
};

export default textInputAdd;