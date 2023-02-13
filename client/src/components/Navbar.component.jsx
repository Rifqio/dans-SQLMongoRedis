import { Button, Navbar } from "flowbite-react";
import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar fluid={true} rounded={true}>
      <NavLink to="/" className="flex">
        {/* <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Database Task
        </span>
      </NavLink>
      <div className="flex md:order-2">
        <Link to="/add-user"><Button>Add New User</Button></Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link>
          <NavLink to="/">Home</NavLink>
        </Navbar.Link>
        <Navbar.Link>
          <NavLink to="/class-list">Class List</NavLink>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
