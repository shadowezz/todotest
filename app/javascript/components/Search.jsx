import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchBy: "title"
        }
        this.handleChange = this.handleChange.bind(this)
        this.changeSearch = this.changeSearch.bind(this)
    }

    changeSearch(event) {
        this.setState({searchBy: event.target.value})
    }

    handleChange(event) {
        let newList = []
        if (event.target.value !== "") {
            newList = this.props.todos.filter(item => {
                const parameter = this.state.searchBy === "title" ? item.title.toLowerCase()
                    : item.category.toLowerCase()
                const filter = event.target.value.toLowerCase()
                return parameter.includes(filter)
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
                <input type="radio" name="search" value="title" onClick={this.changeSearch} 
                    defaultChecked/> Title
                <input type="radio" name="search" value="category" onClick={this.changeSearch}/> Cateogry
            </div>
        )
    }
}

export default Search