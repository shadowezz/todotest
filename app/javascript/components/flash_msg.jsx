import React from 'react'

class FlashMsg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            type: ''
        }
    }

    // componentDidMount() {
    //     this.setState({message: this.props.message})
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps !== this.props.message) {
    //         this.setState({message: this.props.message})
    //     }
    // }

    render() {
        return (
            <div>
                {this.props.messages}
            </div>
        )
    }
}

export default FlashMsg