import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

class NewTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            deadline: "",
            errors: ""
        }
    ;}

    componentDidMount() {
        if (!this.props.loggedInStatus) {
          this.props.history.push('/')
        }
    }

    backendLogout = () => {
        axios.delete('/api/v1/logout', {withCredentials:true})
          .then(response => {
            this.props.handleLogout()
            this.props.history.push('/')
          })
          .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
          [name]: value
        })
      };
    handleSubmit = (event) => {
        event.preventDefault()
        const {title, description, category, deadline} = this.state
        let todo = {
          title: title,
          description: description,
          category: category,
          deadline: deadline,
        }
        axios.post('/api/v1/todo_items/create', {todo}, {withCredentials: true})
            .then(response => {
            if (response.data.status === 'created') {
                this.props.history.push('/todo_items')
            } else {
                this.setState({
                errors: response.data.errors
                })
            }
            })
            .catch(error => console.log('api errors:', error))
        };

    handleErrors = () => {
        return (
          <div>
            <ul>{this.state.errors.map((error) => {
              return <li>key={error}>{error}</li>
            })}
            </ul> 
          </div>
        )
      }
    render() {
        const {title, description, category, deadline} = this.state
    return (
          <div>
            <nav>
                <Link to="/logout" onClick={this.props.handleLogout}>Logout</Link>
            </nav>
            <h1>Create New Todo Item</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                placeholder="Title"
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
              <input
                placeholder="Description"
                type="textarea"
                name="description"
                value={description}
                onChange={this.handleChange}
              />
              <input 
                placeholder="Category"
                type="text"
                name="category"
                value={category}
                onChange={this.handleChange}
              />
              <input
                type="datetime-local"
                name="deadline"
                value={deadline}
                onChange={this.handleChange}
              />
            
              <button placeholder="submit" type="submit">
                Create
              </button>
          
            </form>
            <div>
              {
                this.state.errors ? this.handleErrors() : null
              }
            </div>
          </div>
        );
      }
    
}

export default NewTodo;