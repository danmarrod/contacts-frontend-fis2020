import React from 'react';
import Contact from './Contact.js';
import Alert from './Alert.js';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContact: null
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handeCloseError = this.handleCloseError.bind(this);
    }

    handleEdit(contact) {
        this.setState({
            selectedContact: contact.name
        });
    }

    handleCloseError() {
        this.setState({
            selectedContact: null
        });
    }

    render() {
        return (
            <div>
                <Alert message={this.state.selectedContact} onClose={this.handeCloseError} />
                <table class="table" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    {this.props.contacts.map((contact) =>
                        <Contact contact={contact} onEdit={this.handleEdit} />
                    )}
                </table >
            </div>
        )
    }
}

export default Contacts;