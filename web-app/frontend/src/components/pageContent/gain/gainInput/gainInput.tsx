import React from 'react';
import './gainInput.css';
import typedUseSelector from '../../../../redux/reduxInterfaces';

const GainInput: React.FC = () => {

    const gainValue =  typedUseSelector(state => state.gainValue);

    return(
        <input className="gain-input"
        type="number" value={gainValue}>
        </input>
    )
}

export default GainInput;
