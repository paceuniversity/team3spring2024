import React from "react";
import { NavLink } from 'react-router-dom';
import { BsHouseDoor, BsCalendar, BsMusicNote, BsGear, BsBook } from 'react-icons/bs';
import './NavBar.css'; 

const NavBar = () =>{
    const iconSize = 20; // set size of icon
    const strokeWidth = .5; // set the stroke width

    return(
        // links to different tabs
        <nav className="bottom-navbar">
            <ul className="nav-link">
                <li> 
                    <NavLink to="/diary" exact activeClassName="active"> 
                        <BsHouseDoor size={iconSize} strokeWidth={strokeWidth}/>
                    </NavLink>
                </li>
            </ul>
            <ul className="nav-link">
                <li>
                    <NavLink to="/calendar" activeClassName="active">
                        <BsCalendar size={iconSize} strokeWidth={strokeWidth}/>
                    </NavLink>
                </li>
            </ul>
            <ul className="nav-link">
                <li>
                    <NavLink to="/meditation" activeClassName="active">
                        <BsMusicNote size={iconSize} strokeWidth={strokeWidth}/>
                    </NavLink>
                </li>
            </ul>
            <ul className="nav-link">
                <li>
                    <NavLink to="/periodInfo" activeClassName="active">
                        <BsBook size={iconSize} strokeWidth={strokeWidth}/>
                    </NavLink>
                </li>
            </ul>
            <ul className="nav-link">
                <li>
                    <NavLink to="/medInfo" activeClassName="active">
                        <BsBook size={iconSize} strokeWidth={strokeWidth}/>
                    </NavLink>
                </li>
            </ul>
            <ul className="nav-link">
                <li>
                    <NavLink to="/settings" activeClassName="active">
                        <BsGear size={iconSize} strokeWidth={strokeWidth}/>
                    </NavLink>
                </li>
            </ul>
        </nav>
            
    );
};
export default NavBar;
