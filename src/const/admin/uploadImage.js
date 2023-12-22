
const uploadImage = (file, setData, setImageLoad) => {
    const formData = new FormData();
    formData.append('image', file);

    fetch(import.meta.env.VITE_SERVER_PREFIX + `/upload`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then((response) => {
            setData((prevData) => ({ ...prevData, ['image']: `${response.filename}` }));
            setImageLoad(true)
        }
        )
        .catch(error => console.error('Error:', error));
}

export default uploadImage;