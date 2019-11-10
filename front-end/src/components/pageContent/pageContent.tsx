import React from 'react';
import './pageContent.css';
import SideBar from './sideBar/sideBar'

const PageContent: React.FC = () => {
    return(
        <div className="page-content">
            <SideBar />
            
        </div>
    );
}

export default PageContent;
