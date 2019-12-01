import React from 'react';
import './pageContent.css';
import SideBar from './sideBar/sideBar';
import Graph from './graph/graph';
import typedUseSelector from '../../redux/reduxInterfaces';

const PageContent: React.FC = () => {

    const graphData = typedUseSelector(state => state.graphData);

    return(
        <div className="page-content">
            <SideBar />
            <div className="graph-background">
                <Graph graphData={graphData}/>
            </div>
        </div>
    );
}

export default PageContent;
