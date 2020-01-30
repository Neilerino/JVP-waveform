import React from 'react';
import './pageContent.css';
import SideBar from './sideBar/sideBar';
import Graph from './graph/graph';
import TitleBox from './titleBox/titleBox';
import GainBox from './gain/gainBox/gainBox';
import StatsBox from './statsBox/statsBox'
import FreqBox from './frequency/freqBox';
import MovingAverage from './movingAverage/movingAverage';

const PageContent: React.FC = () => {
    return(
        <div className="page-content">
            <SideBar />
            <div className="graph-background">
                <Graph />
            </div>
            <div className="microprocessor-information">
                <TitleBox text='Digital Potentiometer'/>
                <GainBox />
                <TitleBox text='Data Statistics'/>
                <StatsBox />
                <TitleBox text='Frequency'/>
                <FreqBox />
                <TitleBox text='Moving Average'/>
                <MovingAverage />
            </div>
        </div>
    );
}

export default PageContent;
