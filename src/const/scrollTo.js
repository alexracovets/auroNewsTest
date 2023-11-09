const scrollTo = (isTop) => {
    window.scrollTo({
        top: isTop ? 0 : document.documentElement.scrollHeight,
        behavior: 'smooth',
    });
};

export default scrollTo;