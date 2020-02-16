import React from 'react';
import './statsBox.css';
import StopButton from './stopButton';
import ElapsedTime from './elapsedTime';
//TODO: Finish this component

interface StatsBoxProps {
    collecting: boolean
}

const StatsBox: React.FC<StatsBoxProps> = (props: StatsBoxProps) => {
    return (
        <div className="bounding-box">
            <div className="row first-row">
                <div className="header-box">
                    Elapsed Time
                </div>
            <ElapsedTime collecting={ props.collecting }/>
            </div>
            <div className="row">
                <StopButton disabled={ props.collecting }/>
            </div>
        </div>
    )
};

export default StatsBox;