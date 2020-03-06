import React from 'react';
import './toggleSwitch.css';

interface ToggleSwitchProps {
    isOn: boolean;
    handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = (props: ToggleSwitchProps) => {

    return (
        <>
        <input
          checked={props.isOn}
          onChange={props.handleToggle}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label // Todo: This is a really really bad hack, come back to this if you have time
            style={{ background: props.isOn && '#06D6A0' } as any}
            className="react-switch-label"
            htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
};

export default ToggleSwitch;