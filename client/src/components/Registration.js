import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class Registration extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      passport: '',
      password: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      passport: this.state.passport,
      password: this.state.password,
    };

    axios
      .post('http://localhost:8082/api/users', data)
      .then(res => {
        this.setState({
          username: '',
          firstname: '',
          lastname: '',
	      email: '',
          password: '',
          passport: ''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Registration!");
      })
  };

  render() {
    return (
      <div className="Registration">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Registration</h1>
              <p className="lead text-center">
                  Enter your information
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    className='form-control'
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='First Name'
                    name='firstname'
                    className='form-control'
                    value={this.state.firstname}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Last Name'
                    name='lastname'
                    className='form-control'
                    value={this.state.lastname}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='form-control'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Passport Number'
                    name='passport'
                    className='form-control'
                    value={this.state.passport}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Password'
                    name='password'
                    className='form-control'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
		<br />
      </div>
    );
  }
}

export default Registration;