import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import { Redirect } from 'react-router-dom'


class EditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.todo.id,
            title: this.props.todo.title,
            description: this.props.todo.description,
            category: this.props.todo.category,
            deadline: this.props.todo.deadline

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (!localStorage.getItem('logged_in')) {
          this.props.history.push('/')
        }
    }

    editTodo = (id, todo) => {
        axios.put(`api/v1/update/${id}`, {todo}, {withCredentials: true})
            .then(response => {
                console.log(response.data.status)
            })
            .then(this.props.clearUpdate)
            .catch(error => console.log(error))
        
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { id, title, description, category, deadline } = this.state
        let todo = {
            title: title,
            description: description,
            category: category,
            deadline: deadline,
        }
        this.editTodo(id, todo)
        
    }



    render() {
        return(
            <div>
                <nav>
                    <Link to="/" onClick={this.props.handleLogout}>Logout</Link>
                </nav>
                <h1>Update Todo Item</h1>
                <form onSubmit={this.handleSubmit}>
                    <input  name="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.handleChange} />
                    <input  name="description"
                            type="text"
                            value={this.state.description}
                            onChange={this.handleChange} />
                    <input  name="category"
                            type="text"
                            value={this.state.category}
                            onChange={this.handleChange} />
                    <input  name="deadline"
                            type="datetime-local"
                            value={this.state.deadline ? this.state.deadline.slice(0, 16) : ""}
                            onChange={this.handleChange} />
                    <button>Update Todo Item</button>
                </form>
            </div>  
        )
    }

}

export default EditForm;