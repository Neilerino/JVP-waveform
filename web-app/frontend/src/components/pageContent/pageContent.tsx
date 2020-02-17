import React from 'react';
import './pageContent.css';
import SideBar from './sideBar/sideBar';
import Graph from './graph/graph';
import TitleBox from './titleBox/titleBox';
import GainBox from './gain/gainBox/gainBox';
import StatsBox from './statsBox/statsBox'
import FreqBox from './frequency/freqBox';
import MovingAverage from './movingAverage/movingAverage';
import typedUseSelector from '../../redux/reduxInterfaces';


const PageContent: React.FC = () => {

    const collecting = typedUseSelector((state: { collecting: boolean }) => state.collecting);

    return(
        <div className="page-content">
            <SideBar />
            <div className="graph-background">
                <Graph />
            </div>
            <div className="microprocessor-information">
                <TitleBox text='Digital Potentiometer'/>
                <GainBox collecting={ collecting }/>
                <TitleBox text='Data Collection'/>
                <StatsBox collecting={ collecting }/>
                <TitleBox text='Frequency'/>
                <FreqBox />
                <TitleBox text='Moving Average Filter'/>
                <MovingAverage />
            </div>
        </div>
    );
}

export default PageContent;
