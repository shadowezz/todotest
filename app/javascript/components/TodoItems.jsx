import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

class TodoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      errors: ''
    };
  }

  componentDidMount() {
    axios.get('/api/v1/todo_items/index')
      .then(response => {
        console.log(response.data);
        this.setState({ todos: response.data });
      })
      .catch(error => console.log("api errors:", error))
  }

  backendLogout() {
    axios.delete('/api/v1/logout', {withCredentials:true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  render() {
    const allTodos = this.state.todos.map((todo, index) => (
      <tr key={index}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.category}</td>
        <td>{todo.deadline}</td>
        <td>{todo.created_at}</td>
      </tr>
    ));
    return (
      <div>
        <nav>
          <Link to="/logout" onClick={backendLogout}>Logout</Link>
        </nav>
        <div>
          <h1>Welcome!</h1>
          <p>Here are your todo items.</p>
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
      </div>
    )
  }

}

export default TodoItems;