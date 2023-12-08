
const uploadImage = (file, setData, setImageLoad) => {
    const formData = new FormData();
    formData.append('image', file);

    fetch(`http://localhost:3000/upload`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then((response) => {
            setData((prevData) => ({ ...prevData, ['image']: `http://localhost:3000${response.filename}` }));
            setImageLoad(true)
        }
        )
        .catch(error => console.error('Error:', error));
}

export default uploadImage;