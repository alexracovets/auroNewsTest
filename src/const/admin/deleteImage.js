import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';

const deleteImage = async (element) => {

    const extractFileNameFromUrl = (imageUrl) => {
        const parts = imageUrl.split('?')[0].split('/');
        const cleanedParts = parts.map(part => decodeURIComponent(part));
        return cleanedParts[cleanedParts.length - 1];
    };

    const fileImage = extractFileNameFromUrl(element.image);

    try {
        const storageRefObj = storageRef(getStorage(), `${fileImage}`);
        await deleteObject(storageRefObj);

    } catch (error) {
        console.error('Помилка видалення зображення:', error);
    }
};

export default deleteImage;
