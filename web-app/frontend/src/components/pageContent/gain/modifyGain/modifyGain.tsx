import React from 'react';
import './modifyGain.css';

interface ModifyGainProps {
    type: string;
};

const ModifyGain: React.FC<ModifyGainProps> = (props: ModifyGainProps) => {

    const clickEvent = () => {
        if (props.type === 'increase') {

        } else {

        }
    };

    const buttonType = (props.type === 'increase' ? '+' : '-');

    return(
        <button className='gain-button' onClick={clickEvent}>
            {buttonType}
        </button>
    );
};

export default ModifyGain;