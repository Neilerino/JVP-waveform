import React from 'react';
import './pageContent.css';
import SideBar from './sideBar/sideBar';
import Graph from './graph/graph';

const PageContent: React.FC = () => {
    return(
        <div className="page-content">
            <SideBar />
            <div className="graph-background">
                <Graph />
            </div>
        </div>
    );
}

export default PageContent;
