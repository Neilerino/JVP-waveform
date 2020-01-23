import React from 'react';
import './titleBox.css';

interface SideBarButtonProps extends React.Props<any> {
    text: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ text }) => {
    return(
        <div className="title-box">
            { text }
        </div>
    )
};

export default SideBarButton;