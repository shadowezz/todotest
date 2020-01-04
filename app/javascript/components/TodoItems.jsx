import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import EditForm from './EditForm';
import Search from './Search';

class TodoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_todos: [],
      displayed_todos: [],
      errors: '',
      update: false
    };
    this.clearUpdate = this.clearUpdate.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)
  }


  componentDidMount() {
    if (!localStorage.getItem('logged_in')) {
      this.props.history.push('/')
    }
    else {
      axios.get('/api/v1/todo_items/index')
        .then(response => {
          console.log(response.data);
          this.setState({ all_todos: response.data, displayed_todos: response.data });
        })
        .catch(error => console.log("api errors:", error))
      }
  }

  updateDisplay = (newList) => {
    this.setState({displayed_todos: newList})
  }

  clearUpdate = () => {
    this.setState({update: false})
    axios.get('/api/v1/todo_items/index')
        .then(response => {
          console.log(response.data);
          this.setState({ all_todos: response.data, displayed_todos: response.data });
        })
        .catch(error => console.log("api errors:", error))
  }

  deleteTodo = (id) => {
    axios.delete(`/api/v1/destroy/${id}`, {withCredentials:true})
      .then(response => {
        console.log(response.data.message)
        const new_todos = this.state.all_todos.filter((item) => item.id != id)
        const new_display = this.state.displayed_todos.filter((item) => item.id != id)
        this.setState({ all_todos: new_todos, displayed_todos: new_display })
      })
      .catch(error => console.log(error))
  }

  render() {
    const allTodos = this.state.displayed_todos.map((todo, index) => (
      <tr key={index}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.category}</td>
        <td>{todo.deadline ? todo.deadline.slice(0, 16) : ""}</td>
        <td>{todo.created_at.slice(0, 16)}</td>
        <td><button type="button" onClick={() => this.setState({update: todo})}>Update</button></td>
        <td><button type="button" onClick={() => this.deleteTodo(todo.id)}>Completed</button></td>
      </tr>
    ));
    if (!this.state.update) {
      return (
        <div>
          <nav>
            <Link to="/" onClick={this.props.handleLogout}>Logout</Link>
          </nav>
          <div>
            <h1>Welcome {localStorage.getItem("username")}</h1>
            <p>Here are your todo items.</p>
            <Search todos={this.state.all_todos} updateDisplay={this.updateDisplay}/>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Deadline</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                { allTodos }
              </tbody>
            </table>
          </div>
          <Link to="/todo_items/new">Create new Todo!</Link>
        </div>
      )
    }

    else {
      return (
        <EditForm todo = {this.state.update} clearUpdate = {this.clearUpdate}/>
      )
    }
  }

}

export default TodoItems;