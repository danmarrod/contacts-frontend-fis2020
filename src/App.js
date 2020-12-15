import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Contacts from './Contacts.js';

function App() {

  const contacts = [{
    name: "John",
    phone: "564645"
  }, {
    name: "Megan",
    phone: "564566"
  }];

  return (
    <div>
      <h1> Hello World!</h1>
      <Contacts contacts={contacts} />
    </div>
  );
}

export default App;
