import React, {useState} from 'react';
import './gainInput.css';
import typedUseSelector from '../../../../redux/reduxInterfaces';
import { useDispatch } from 'react-redux';
import { updateGainValue } from '../../../../redux/actions/microActions';

const GainInput: React.FC = () => {

    const dispatch = useDispatch();

    const [state, updateState] = useState({
        value: typedUseSelector(state => state.gainValue)
    })

    const changeValue = (inputValue: React.ChangeEvent<HTMLInputElement>) => {
        const updateValue = Number(inputValue.target.value);
        updateState({ value: updateValue });
        dispatch(updateGainValue({
            type: 'UPDATE_GAIN_VALUE',
             value: updateValue 
            }))
    };

    return(
        <input className="gain-input"
        type="number" defaultValue={state.value} onChange={e => changeValue(e)}>
        </input>
    )
}

export default GainInput;
