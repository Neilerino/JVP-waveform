import React from 'react';
import './sideBar.css'
import typedUseSelector from '../../../redux/reduxInterfaces';

const SideBar: React.FC = () => {

    const display = typedUseSelector((state: { displaySideBar: Boolean; }) => state.displaySideBar);

    return (
        <div className={ `side-bar${display ? '' : '-none'}`}></div>
    );
}

export default SideBar;
