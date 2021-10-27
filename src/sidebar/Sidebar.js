import React, {useState} from 'react';
import '../sidebar/Sidebar.css';
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import { Link } from 'react-router-dom';
import { SidebarData } from '../sidebar/SidebarData';
import { IconContext } from 'react-icons';
import logo from '../icon/weBLOGW.PNG';
import logo1 from '../icon/logotop.PNG';

function Sidebar() {
    const [navbar, setNavbar] = useState(false)
    const showNavbar = () => setNavbar(!navbar)

    return (
        <>
                <IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showNavbar} />
                </Link>
                <img src ={logo1} className="logo1" alt='logo'/>

            </div> 

            <nav className={navbar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showNavbar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-barss" style={{float:'right',marginRight:'-12%'}}>
                            <BsIcons.BsArrowLeftSquare/>
                        </Link>
                        <>
                        <img src ={logo} className="logo" alt='logo'/>
                       
                        </>
                    </li>
                    <br/>
                    {SidebarData.map((item, index) => {
                        return(
                           
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icons}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar;
