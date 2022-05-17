import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

const NavBar=()=> {
   const[isOpen,setIsOpen]=React.useState(false)
  const toggle=()=>{
      setIsOpen(!isOpen)
  }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">GitProfile</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile-card">Profile Card</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}
export default NavBar