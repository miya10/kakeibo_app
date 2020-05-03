import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar bg='light' variant='light'>
        <Navbar.Brand>家計簿 App</Navbar.Brand>
        {/* <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav> */}
      </Navbar >
    );
  }
}