
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import navbarData from "../../routes/listRoutes";
import './header.scss';


const Header = () => {
    let [collapsed, setCollapsed] = useState(true);

    const user = useSelector(state => state.accountReducer.account);


    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }
    const closeSidenav = () => {
        setCollapsed(false);

    }

    return (
        // <Navbar expand="lg" className="bg-body-tertiary">
        //     <Container>
        //         {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
        //         <Navbar.Toggle aria-controls="navbarScroll" />
        //         <Navbar.Collapse id="navbarScroll">
        //             <Nav
        //                 className="me-auto my-2 my-lg-0"
        //                 style={{ maxHeight: '100px' }}
        //                 navbarScroll
        //             >
        //                 <NavLink to="/" className="nav-link">Home</NavLink>
        //                 <NavLink to="/about" className="nav-link">About</NavLink>

        //                 {/* <Nav.Link href="#action1">Home</Nav.Link>
        //                 <Nav.Link href="#action2">Link</Nav.Link> */}

        //                 <Nav.Link href="#" disabled>
        //                     Link
        //                 </Nav.Link>
        //             </Nav>
        //             <NavDropdown title="Link" id="navbarScrollingDropdown">
        //                 {
        //                     user && user.access_token != '' ?
        //                         <NavDropdown.Item onClick={() => handleLogout()}>
        //                             Logout
        //                         </NavDropdown.Item>
        //                         :
        //                         <NavDropdown.Item onClick={() => handleLogin()}>
        //                             Login
        //                         </NavDropdown.Item>
        //                 }

        //                 {/* <NavDropdown.Item onClick={() => handleLogin()}>
        //                             Login
        //                         </NavDropdown.Item>
        //                         <NavDropdown.Item onClick={() => handleLogout()}>
        //                             Logout
        //                         </NavDropdown.Item> */}

        //             </NavDropdown>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        <div className={`sidenav ${collapsed === true ? 'sidenav-collapsed' : ''} `}>
            <div className="logo">
                <div className="icon_logo" onClick={() => toggleCollapse()} >
                    <i className="fab fa-angular"></i>
                </div>
                {collapsed ? <span className="text" >Ivymoda</span> : ''}
                {collapsed ? <i className="close fas fa-angle-left" onClick={() => closeSidenav()} ></i > : ''}
            </div >
            <ul className="sidenav-nav">
                {navbarData.map((item, index) => (
                    // Each item in the imported array is mapped to a NavLink
                    <li className="sidenav-nav-item" key={index}>
                        <NavLink className="sidenav-nav-link" to={item.routerLink} activeclassname="active">
                            <i className={`sidenav-link-icon ${item.icon}`}></i>
                            {collapsed ? <span className="sidenav-link-text" >{item.label}</span> : ''}
                        </NavLink>
                    </li>
                ))}
            </ul >
        </div >



    )
}

export default Header;