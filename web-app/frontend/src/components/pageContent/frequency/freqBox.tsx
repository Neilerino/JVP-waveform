import React, { ChangeEvent } from 'react';
import './frequency.css';
import { useDispatch } from 'react-redux';
import { updateFrequency } from '../../../redux/actions/microActions';

const FreqBox: React.FC = () => {

    const dispatch = useDispatch();

    const changeFrequency = (frequency: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFrequency({ type: 'UPDATE_FREQUENCY', value: Number(frequency.target.value) }));
    }

    return(
        <div className="bounding-box">
            <div className="row">
                <div className="header-box header-box-frequency">Samples / Second</div>
                <input className="frequency-input" onChange={e => changeFrequency(e)} defaultValue="1.0" type="number"/>
            </div>
        </div>
    )
}

export default FreqBox; 