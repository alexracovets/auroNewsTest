import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { v4 } from 'uuid';

const handleInputChange = async (e, storageName, name, key, setData, setImage) => {
    if (name === 'image') {
        const file = e.target.files[0];
        const imageRef = ref(storage, `${storageName}/${file.name + v4()}`);
        
        try {
            await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(imageRef);
            setData((prevData) => ({ ...prevData, ['image']: downloadURL }));
            setData((prevData) => ({ ...prevData, ['key']: v4() }));
            setImage(true);
        } catch (error) {
            console.error("Помилка завантаження зображення:", error);
        }
    } else if (name === 'text') {
        const { value } = e.target;
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
        const { value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
};

export default handleInputChange;