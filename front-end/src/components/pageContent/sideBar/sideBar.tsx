import React from 'react';
import './sideBar.css'
import typedUseSelector from '../../../redux/reduxInterfaces';
import SideBarButton from '../sideBarButton/sideBarButton';

const SideBar: React.FC = () => {

    const display = typedUseSelector((state: { displaySideBar: Boolean; }) => state.displaySideBar);

    return (
        <div className={ `side-bar${display ? '' : '-none'}`}>
            <SideBarButton buttonType='collect'/>
            <SideBarButton buttonType='history'/>
            <SideBarButton buttonType='save'/>
            <SideBarButton buttonType='csv'/>
            <SideBarButton buttonType='help'/>
        </div>
    );
}

export default SideBar;
