import React from 'react';
import './pageContent.css';
import SideBar from './sideBar/sideBar';
import Graph from './graph/graph';
import typedUseSelector from '../../redux/reduxInterfaces';
import TitleBox from './titleBox/titleBox';
import GainBox from './gainBox/gainBox';
import StatsBox from './statsBox/statsBox'
import { Stats } from 'fs';

const PageContent: React.FC = () => {

    const graphData = typedUseSelector(state => state.graphData);

    return(
        <div className="page-content">
            <SideBar />
            <div className="graph-background">
                <Graph graphData={graphData}/>
            </div>
            <div className="microprocessor-information">
                <TitleBox text='Digital Potentiometer'/>
                <GainBox />
                <TitleBox text='Data Statistics'/>
                <StatsBox />
            </div>
        </div>
    );
}

export default PageContent;
