import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container className='myContactsButton' fluid>
          <div className="buttonDiv">
          <Button color="primary" className="linkButton" tag={Link} to="/users">Manage My Contacts</Button>
          </div>
        </Container> 
      </div>
    );
  }
}

export default Home;