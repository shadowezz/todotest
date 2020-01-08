import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
//import FlashMsg from './FlashMsg'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      errors: ''
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
let user = {
      email: email,
      password: password
    }
    
axios.post('api/v1/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        localStorage.setItem('logged_in', true)
        localStorage.setItem('username', response.data.user.username)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors,
          email: '',
          password: ''
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/todo_items')
  }
// handleErrors = () => {
//     return (
//       <div>
//         {this.state.errors}
//       </div>
//     )
//   }
render() {
    const {username, email, password} = this.state
return (
      <div>
        <h1>Log In</h1>
        <div>
          {this.state.errors}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
           or <Link to='/signup'>sign up</Link>
          </div>
          
        </form>

      </div>
    );
  }
}
export default Login;