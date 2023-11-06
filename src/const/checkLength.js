const checkLength = (string, count) => {
    let checked;
    string.length <= count ? checked = string : checked = string.substring(0, count - 3) + '...';
    return checked
};

export default checkLength;