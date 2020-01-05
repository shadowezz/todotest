import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchBy: "title",
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.changeSearch = this.changeSearch.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    changeSearch(event) {
        this.setState({searchBy: event.target.value})
    }

    handleSearch(event) {
        let newList = []
        if (event.target.value !== "") {
            newList = this.props.all_todos.filter(item => {
                const parameter = this.state.searchBy === "title" ? item.title.toLowerCase()
                    : item.category.toLowerCase()
                const filter = event.target.value.toLowerCase()
                return parameter.includes(filter)
            })
        }
        else {
            newList = this.props.all_todos
        }
        this.props.updateDisplay(newList)
    }

    dynamicSort(key, order = 'asc') {
        return (a, b) => {
            let comparison = 0
            if (!a[key]) {
                return comparison
            }
            else if (a[key].toLowerCase() > b[key].toLowerCase()) {
                comparison = 1
            }
            else if (a[key].toLowerCase() < b[key].toLowerCase()) {
                comparison = -1
            }
            return (order === 'desc') ? comparison * -1 : comparison
        }
    }

    handleSort(event) {
        let newList = []
        let sortBy = event.target.value
        newList = this.props.displayed_todos.sort(this.dynamicSort(sortBy))
        if (sortBy === "created_at") {
            newList = this.props.displayed_todos.sort(this.dynamicSort(sortBy, 'desc'))
        }
        else {
            newList = this.props.displayed_todos.sort(this.dynamicSort(sortBy, 'asc'))
        }
        this.props.updateDisplay(newList)
    }




    render() {
        return (
            <div>
                <input type="text" onChange={this.handleSearch} placeholder={"Search by " + this.state.searchBy}/>
                <input type="radio" name="search" value="title" onClick={this.changeSearch} 
                    defaultChecked/> Title
                <input type="radio" name="search" value="category" onClick={this.changeSearch}/> Cateogry <br></br>
                Sort By
                <select name="sort" defaultValue="deadline" onChange={this.handleSort}>
                    <option value="title">Alphabetical</option>
                    <option value="created_at">Created date</option>
                    <option value="deadline">Deadline</option>
                    
                </select>
            </div>
        )
    }
}

export default Search