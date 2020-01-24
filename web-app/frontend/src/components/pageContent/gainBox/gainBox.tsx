import React from 'react';
import './gainBox.css';
import GainInput from '../gainInput/gainInput'
//TODO: Finish this component

const GainBox: React.FC = () => {
    return (
        <div className="bounding-box">
            <div className="top-row">
                <div className="header-box-gain">
                    Gain
                </div>
                <GainInput />
            </div>
        </div>
    )
};

export default GainBox;