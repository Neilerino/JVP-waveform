import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCollecting } from '../../../redux/actions/microActions';

interface StartButtonProps {
    disabled: boolean
}

const StartButton: React.FC<StartButtonProps> = (props: StartButtonProps) => {

    const dispatch = useDispatch();

    const startCollection = async () => {
        const response = await fetch('http://localhost:4000/collection/POST/start', {
            method: 'POST',
            mode: 'no-cors',
        });
        if (response.status === 0) {
            dispatch(updateCollecting({type: 'UPDATE_COLLECTING', value: true}));
        } else {
            Error('Error Collecting Data');
        }
    }


    return(
        <button className="start-button" onClick={ startCollection } disabled={ props.disabled }>
            Start Data Collection
        </button>
    );
}

export default StartButton;