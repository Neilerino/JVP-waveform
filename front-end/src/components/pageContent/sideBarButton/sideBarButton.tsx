// TODO: Code Button functionalities
import React from 'react';
import './sideBarButton.css';

interface SideBarButtonProps extends React.Props<any> {
    buttonType: string;
};

const SideBarButton: React.FC<SideBarButtonProps> = ({ buttonType }) => {

    const buttonAction = () => {
        if (buttonType === 'collect') {
            console.log('The button was clicked');
        }
    }

    let buttonString;
    if (buttonType === 'collect') {
        buttonString = 'Collect Data';
    } else if (buttonType === 'history') {
        buttonString = 'History';
    } else if (buttonType === 'csv') {
        buttonString = 'Generate CSV';
    } else if (buttonType === 'save') {
        buttonString = 'Save Data'
    } else if (buttonType === 'help') {
        buttonString = 'Help';
    }

    return (
        <div onClick={buttonAction} className="button">
            {buttonString}
        </div>
    );
}

export default SideBarButton;
