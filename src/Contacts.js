import React from 'react';
import Contact from './Contact.js';
import Alert from './Alert.js';
import NewContact from './NewContact.js';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            contacts: this.props.contacts
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handeCloseError = this.handleCloseError.bind(this);
        this.onAddContact = this.onAddContact.bind(this);
    }

    handleEdit(contact) {
        this.setState({
            errorInfo: contact.name
        });
    }

    handleCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    onAddContact(contact) {
        // previous state cannot be change, its immutable, then we need copy previous content and add the new contact
        this.setState(prevState => {
            const contacts = prevState.contacts;
            // check there is not two equals names, we ara using 'name' as a primary key
            if (!contacts.find (c => c.name === contact.name)) {
                return({
                    //create a new array with the last content of contacts and add new contact
                    contacts: [...prevState.contacts, contact]
                });
            }

            return({
                errorInfo: 'Contact already exists'
            });
           
        });

    }

    render() {
        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handeCloseError} />
                <table class="table" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <NewContact onAddContact={this.onAddContact}></NewContact>
                    {this.state.contacts.map((contact) =>
                        <Contact contact={contact} onEdit={this.handleEdit} />
                    )}
                </table >
            </div>
        )
    }
}

export default Contacts;