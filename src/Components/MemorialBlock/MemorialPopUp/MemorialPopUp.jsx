import PropTypes from 'prop-types';

import PopUp from '../../PopUp/PopUp';
 
import SlidePopUp from './SlidePopUp/SlidePopUp';

MemorialPopUp.propTypes = {
    isPopUpOpen: PropTypes.bool,
    selectedItem: PropTypes.object,
    closePopUp: PropTypes.func,
};

export default function MemorialPopUp({ isPopUpOpen, selectedItem, closePopUp }) {

    return (
        <PopUp isPopUpOpen={isPopUpOpen}>
            {selectedItem && <SlidePopUp selectedItem={selectedItem} closePopUp={closePopUp} />}
        </PopUp >
    )
}
