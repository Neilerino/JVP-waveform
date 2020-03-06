import React, { useState } from 'react';
import ToggleSwitch from './toggleSwitch';
import './movingAverage.css';
import { useDispatch } from 'react-redux';
import { updateAverageFilter } from '../../../redux/actions/microActions';


interface MovingAverageState {
    active: boolean;
    value: number;
}

const MovingAverage: React.FC = () => {

    const dispatch = useDispatch();

    const [state, updateState] = useState<MovingAverageState>({
        active: false,
        value: 2,
    });

    const updateActive = (active: boolean) => {
        const nextState = active ? false : true
        updateState({ 
            active: nextState,
            value: state.value,
        });

        if (nextState === true) {
        dispatch(updateAverageFilter({
            type: 'UPDATE_AVERAGE_VALUE',
            value: state.value,
        }));
        
        } else if (nextState === false) {
            dispatch(updateAverageFilter({
                type: 'UPDATE_AVERAGE_VALUE',
                value: null,
            }));
        }
    }

    const changeValue = (filterValue: React.ChangeEvent<HTMLInputElement>) => {
        if (state.active) {
            updateState({
                value: Number(filterValue.target.value),
                active: state.active
            });
            
            dispatch(updateAverageFilter({
                type: 'UPDATE_AVERAGE_VALUE',
                value: Number(filterValue.target.value),
            }));

        } else {
            updateState({
                value: Number(filterValue.target.value),
                active: state.active
            });
        }
    }

    return(
        <div className="bounding-box">
            <div className="row">
                <div className="header-box"> Enabled </div>
                <ToggleSwitch isOn={state.active} handleToggle={() => {updateActive(state.active)}} />
            </div>
            <div className="row add-padding-top">
                <div className="header-box">Samples</div>
                <input className="gain-input"
                type="number" defaultValue={state.value} onChange={e => changeValue(e)}>
                </input>
            </div>
        </div>
    )
}

export default MovingAverage;
