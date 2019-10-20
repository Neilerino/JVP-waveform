import React from 'react';
import './hamburger.css'
import { useDispatch } from 'react-redux';
import toggleSideBar from '../../../redux/actions/sideBarActions';

const Hamburger: React.FC = () => {

    const dispatch = useDispatch();

    const showSideBar = () => {
        dispatch(toggleSideBar());
    };

    return(
        <div onClick={showSideBar} className="hamburger"></div>
    );
}

export default Hamburger;
