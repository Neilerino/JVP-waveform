// TODO: Code Button functionalities
import React from 'react';
import './sideBarButton.css';
import { useDispatch } from 'react-redux';
import { updateCollecting } from '../../../redux/actions/microActions';

interface SideBarButtonProps extends React.Props<any> {
    buttonType: string;
};

const SideBarButton: React.FC<SideBarButtonProps> = ({ buttonType }) => {

    const dispatch = useDispatch()

    const collectData = async () => {
        const response = await fetch('http://localhost:4000/collection/POST/start', {
            method: 'POST',
            mode: 'no-cors',
        });
        if (response.status === 0) {
            dispatch(updateCollecting({type: 'UPDATE_COLLECTING', value: true}));
        } else {
            Error('Error Collecting Data');
        }
    };

    const buttonAction = async () => {
        if (buttonType === 'collect') {
            collectData();
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
