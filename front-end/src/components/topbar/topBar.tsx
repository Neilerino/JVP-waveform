import React from 'react';
import './topBar.css'
import Hamburger from './hamburger/hamburger'

interface topBarProps extends React.Props<any> {
    pageTitle: string;
};

const TopBar: React.FC<topBarProps> = ({ pageTitle }) => {
    return(
        <div className="top-bar">
            <Hamburger />
            <a className="page-title">{ pageTitle }</a>
        </div>
    );
}

export default TopBar;