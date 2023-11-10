import PropTypes from 'prop-types';

import PopUp from "../../PopUp/PopUp";

MuseumPopUp.propTypes = {
    isPopUpOpen: PropTypes.bool.isRequired,
    selectedItem: PropTypes.object,
    closePopUp: PropTypes.func.isRequired,
};

import SlidePopUp from './SlidePopUp/SlidePopUp';

export default function MuseumPopUp({ isPopUpOpen, selectedItem, closePopUp }) {

    return (
        <PopUp isPopUpOpen={isPopUpOpen}>
            {selectedItem && <SlidePopUp selectedItem={selectedItem} closePopUp={closePopUp} />}
        </PopUp>
    );
}
