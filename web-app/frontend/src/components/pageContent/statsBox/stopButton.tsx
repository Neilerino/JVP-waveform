import React from 'react';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { updateCollecting } from '../../../redux/actions/microActions';

interface StopButtonProps {
    disabled: boolean
}

const StopButton: React.FC<StopButtonProps> = (props: StopButtonProps) => {

    const dispatch = useDispatch();

    const stopCollection = async () => {
        const response = await fetch('http://localhost:4000/collection/POST/stop', {
            method: 'POST',
            mode: 'no-cors',
        });
        if (response.status === 0) {
            dispatch(updateCollecting({type: 'UPDATE_COLLECTING', value: false}));
            toast.info('Stopping Data Collecting');
        } else {
            toast.error('Could Not Stop Collecting');
            Error('Could not stop data Collection');
        }
    }

    return(
        <button className="stop-button" onClick={ stopCollection } disabled={ !props.disabled }>
            Stop Data Collection
        </button>
    )
}

export default StopButton;