import React from 'react';
import Contact from './Contact.js';
import Alert from './Alert.js';
import NewContact from './NewContact.js';
import EditContact from './EditContact.js';
import ContactsApi from './ContactsApi';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            contacts: [],
            isEditing: {}
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handeCloseError = this.handleCloseError.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    //React call this when the component is istancied a move to dom tree
    componentDidMount() {
        ContactsApi.getAllContacts()
            .then(
                (result) => {
                    this.setState({
                        contacts: result
                    })
                },
                (error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    })
                }
            )
    }

    handleEdit(contact) {
        this.setState(prevState => ({
            isEditing: { ...prevState.isEditing, [contact.name]: contact }
        }));
    }

    handleCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    handleCancel(name, contact) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[name];
            return {
                isEditing: isEditing
            }
        });
    }

    handleChange(name, contact) {
        this.setState(prevState => ({
            isEditing: { ...prevState.isEditing, [name]: contact }
        }));
    }

    handleSave(name, contact) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[name];

            if (name === contact.name) {
                const contacts = prevState.contacts;
                const pos = contacts.findIndex(c => c.name === contact.name);
                return {
                    contacts: [...contacts.slice(0, pos), Object.assign({}, contact), ...contacts.slice(pos + 1)],
                    isEditing: isEditing
                }
            }

            return {
                errorInfo: "Cannot edit name"
            }

        });
    }

    handleDelete(contact) {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter((c) => c.name !== contact.name)
        }));
    }

    addContact(contact) {
        // previous state cannot be change, its immutable, then we need copy previous content and add the new contact
        this.setState(prevState => {
            const contacts = prevState.contacts;
            // check there is not two equals names, we ara using 'name' as a primary key
            if (!contacts.find(c => c.name === contact.name)) {
                return ({
                    //create a new array with the last content of contacts and add new contact
                    contacts: [...prevState.contacts, contact]
                });
            }

            return ({
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
                    <tbody>
                        <NewContact onAddContact={this.addContact} />
                        {this.state.contacts.map((contact) =>
                            !this.state.isEditing[contact.name] ?
                                <Contact key={contact.name} contact={contact}
                                    onEdit={this.handleEdit}
                                    onDelete={this.handleDelete} />
                                :
                                <EditContact key={contact.name} contact={this.state.isEditing[contact.name]}
                                    //other way to define methods, this not necessary in constructor
                                    onCancel={this.handleCancel.bind(this, contact.name)}
                                    onChange={this.handleChange.bind(this, contact.name)}
                                    onSave={this.handleSave.bind(this, contact.name)} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Contacts;