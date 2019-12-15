// TODO: Code Button functionalities
import React from 'react';
import './sideBarButton.css';

interface SideBarButtonProps extends React.Props<any> {
    buttonType: string;
};

const SideBarButton: React.FC<SideBarButtonProps> = ({ buttonType }) => {

    // Send an API call to the backend to start sending data
    const collectData = async () => {
        fetch('http://localhost:4000/collection/POST/start');
        console.log('Starting Data Collection');
    };

    const stopData = async () => {
        fetch('http://localhost:4000/collection/POST/stop')
        console.log('Stopping collection')
    }

    const buttonAction = async () => {
        if (buttonType === 'collect') {
            collectData();
        }
        if (buttonType === 'stop') {
            stopData();
        }
    };

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
    } else {
        buttonString = 'Stop'
    }

    return (
        <div onClick={buttonAction} className="button">
            {buttonString}
        </div>
    );
}

export default SideBarButton;
