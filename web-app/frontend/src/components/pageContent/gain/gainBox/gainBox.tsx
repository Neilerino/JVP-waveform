import React from 'react';
import './gainBox.css';
import ModifyGain from '../modifyGain/modifyGain';
import GainInput from '../gainInput/gainInput';
//TODO: Finish this component

const GainBox: React.FC = () => {
    return (
        <div className="bounding-box">
            <div className="row first-row">
                <div className="header-box-gain">
                    Gain
                </div>
                <GainInput />
            </div>
            <div className="row">
                <ModifyGain type="increase"/>
                <ModifyGain type="decrease"/>
            </div>
        </div>
    )
};

export default GainBox;