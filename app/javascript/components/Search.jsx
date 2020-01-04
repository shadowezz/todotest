import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let newList = []
        if (event.target.value !== "") {
            newList = this.props.todos.filter(item => {
                const title = item.title.toLowerCase()
                const filter = event.target.value.toLowerCase()
                return title.includes(filter)
            })
        }
        else {
            newList = this.props.todos
        }
        this.props.updateDisplay(newList)
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} placeholder="Search by title"/>
            </div>
        )
    }
}

export default Search