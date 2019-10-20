import React from 'react';
import TopBar from '../topbar/topBar';
import PageContent from '../pageContent/pageContent';

const Page: React.FC = () => {
    return(
        <div className="main-page">
            <TopBar pageTitle="JVP Waveform Analyzer"/>
            <PageContent />
        </div>
    );
}

export default Page;