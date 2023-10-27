const handleScroll = (setIsScrolled) => {
    if (window.scrollY > 90) {
        if (window.scrollY > (window.lastScrollY || 0)) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        window.lastScrollY = window.scrollY;
    }
};

export default handleScroll;