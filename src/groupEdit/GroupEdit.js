import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Container, Button} from 'reactstrap';
import {Form, FormGroup} from 'react-bootstrap';
import AppNavbar from '../navbar/Navbar';
import * as Regex from '../regex/Regex';
class GroupEdit extends Component {

  emptyItem = {
    firstName: '',
    lastName: '',
    organisation: '',
    email: '',
    tel: '',
  };
  formDefaults = {
    firstName: {isValid: true, message: ''},
    lastName: {isValid: true, message: ''},
    organisation: {isValid: true, message: ''},
    email: {isValid: true, message: ''},
    tel: {isValid: true, message: ''}
}

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      formDefaults: this.formDefaults
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/user/${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }


  async handleSubmit(event) {
    const {item} = this.state;
    if (this.formValidation()){
    await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/users');
    }
  }

  async handleSubmitupdate(event) {
    const {item} = this.state;
    if (this.formValidation()){
    await fetch(`/api/user/update/${item.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/users');
    }
  }
  checkSubmit(){
    const {item} = this.state;
    if(!item.id){
      console.log(item.id);
      this.handleSubmit();
    }else{
      console.log(item.id + " Update ");
      this.handleSubmitupdate();
    }
  }
   // Escapes some HTML tags
   htmlEscape = text => {
    let map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

 // Validates the whole Form
 formValidation = () =>{
  let item = {...this.state.item};
  let formDefaults = {...this.state.formDefaults};
  let isValid = true;

  // For HTML Escape
  item.firstName = this.htmlEscape(item.firstName.trim());
  item.lastName = this.htmlEscape(item.lastName.trim());
  item.organisation = this.htmlEscape(item.organisation.trim());
  item.email = this.htmlEscape(item.email.trim());
  item.tel = this.htmlEscape(item.tel.trim());

  // Validates the First Name
  if (item.firstName.length >= 3 && item.firstName.length <= 25 && item.firstName.match(Regex.FIRST_NAME_REGEX)) {
      formDefaults.firstName.isValid = true;
  } else{
      formDefaults.firstName.isValid = false;
      isValid = false;
      formDefaults.firstName.message = 'The First Name must be at least 3 characters long and cant be longer than 25 characters';
  }
  // Validates the Last Name
  if (item.lastName.length >= 3 && item.lastName.length <= 25 && item.lastName.match(Regex.LAST_NAME_REGEX)) {
      formDefaults.lastName.isValid = true;
  } else{
      formDefaults.lastName.isValid = false;
      isValid = false;
      formDefaults.lastName.message = 'The Last name must be at least 3 characters long and cant be longer than 25 characters';
  }
  // Validates the Organisation
  if (item.organisation.length >= 3 && item.organisation.length <= 25 && item.organisation.match(Regex.ORGANISATION_REGEX)) {
      formDefaults.organisation.isValid = true;
  } else{
      formDefaults.organisation.isValid = false;
      isValid = false;
      formDefaults.organisation.message = 'The Organisation name must be at least 3 characters long and cant be longer than 25 characters';
  }
  // Validates the Phone number
  if (item.tel.length >= 4 && item.tel.length <= 12 && item.tel.match(Regex.TEL_REGEX)) {
      formDefaults.tel.isValid = true;
  }else {
      formDefaults.tel.isValid = false;
      isValid = false;
      formDefaults.tel.message = 'Must be a valid phone number';
  }
  // Validates the Email
  if (item.email.match(Regex.EMAIL_REGEX)){
      formDefaults.email.isValid = true;
  }else{
      formDefaults.email.isValid = false;
      isValid = false;
      formDefaults.email.message = 'Must be a valid email adress';
  }

  // Set the errors
  if (!isValid){
      this.setState({
          formDefaults
      });
  }
  return isValid;
}

  render() {
    const {item, formDefaults} = this.state;
    const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;
    const firstNameClass = ({'is-invalid': !formDefaults.firstName.isValid});
    const lastNameClass = ({'is-invalid': !formDefaults.lastName.isValid});
    const organisationClass = ({'is-invalid': !formDefaults.organisation.isValid});
    const emailClass = ({'is-invalid': !formDefaults.email.isValid});
    const telClass = ({'is-invalid': !formDefaults.tel.isValid});

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            name='firstName'
                            className={firstNameClass}
                            type="text"
                            placeholder="First Name"
                            value={item.firstName || ''}
                            onChange={this.handleChange}

                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.formDefaults.firstName.message}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            name='lastName'
                            className={lastNameClass}
                            type="text"
                            placeholder="Last Name"
                            value={item.lastName || ''}
                            onChange={this.handleChange}

                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.formDefaults.lastName.message}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Organisation</Form.Label>
                        <Form.Control
                            required
                            name='organisation'
                            className={organisationClass}
                            type="text"
                            placeholder="Organisation"
                            value={item.organisation || ''}
                            onChange={this.handleChange}

                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.formDefaults.organisation.message}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            name='email'
                            className={emailClass}
                            type="text"
                            placeholder="Email"
                            value={item.email || ''}
                            onChange={this.handleChange}

                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.formDefaults.email.message}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            required
                            name='tel'
                            className={telClass}
                            type="text"
                            placeholder="Phone Number"
                            value={item.tel || ''}
                            onChange={this.handleChange}

                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.formDefaults.tel.message}
                        </Form.Control.Feedback>
                    </FormGroup>
          <FormGroup>
            <Button color="primary" onClick={(event) => this.checkSubmit()}>Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/users">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(GroupEdit);