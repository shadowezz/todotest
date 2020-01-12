import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: this.props.todo
        }
    }


    render() {
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" 
                style={{
                transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to remove todo item "{this.state.todo.title}"?
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.deleteTodo(this.state.todo.id)}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>           
        )
    }
}

export default Modal