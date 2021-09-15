import axios from 'axios';
import { useEffect, useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Notes from './components/Notes';
import { useDispatch, useSelector } from 'react-redux';
import Chores from './components/Chores';
import Bills from './components/Bills';
import NewNoteForm from './components/NewNoteForm';
import { Route, Link, Switch } from 'react-router-dom';
import NewChoreForm from './components/NewChoreForm';
import NewBillForm from './components/NewBillForm';
import { useHistory } from 'react-router';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';
import './App.css';


const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.loggedInUser);
  const users = useSelector(state => state.users);
  const bgColor = useSelector(state => state.bgColor);
  const [show, setShow] = useState(false);
  const history = useHistory;

  console.log(currentUser);

  let user = users.find(user => user._id === currentUser.id);

  useEffect(() => {
    axios.get('http://localhost:8000/users', { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(res => {
      // console.log(res.data);
      dispatch({ type: 'SET_USERS', payload: res.data });
    });

    axios.get('http://localhost:8000/notes', { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(res => {
      dispatch({ type: 'SET_NOTES', payload: res.data });
    });

    axios.get('http://localhost:8000/chores', { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(res => {
      dispatch({ type: 'SET_CHORES', payload: res.data });
    });

    axios.get(`http://localhost:8000/bills/`, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(res => {
      dispatch({ type: 'SET_BILLS', payload: res.data });
      console.log(res.data);
    });

    // await axios.get(`http://localhost:8000/bills`, { headers: { Authorization: `Bearer ${currentUser.token}` } }).then(res => {
    // dispatch({ type: 'SET_BILLS', payload: res.data });
    // console.log(res.data);
    // });
  }, [currentUser]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogOut = () => {
    dispatch({type: 'LOGOUT'});
  }

  // useEffect(() => {
  //   document.body.style.backgroundColor = "#c0f0f7" ;
  // }, [bgColor]);

  // console.log(currentUser);

  return (

    <div className="App ">

      <Route exact path="/" component={LoginForm} />
      <Route exact path="/register" component={RegistrationForm} />

      <Route path="/home">
        <Navbar className="blueBg" expand="lg">
          <Container>
            <Navbar.Brand> Hi!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <NavDropdown title="Add New" id="basic-nav-dropdown">
                  <NavDropdown.Item><Link to="/home/new-note">Note</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link to="/home/new-chore">Chore</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link to="/home/new-bill">Bill</Link></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={handleLogOut} href="/">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {currentUser.length !== 0 ?
          <>

            {/* <div className="d-flex flex-wrap justify-content-center"> */}
            {/* <div className="d-flex flex-wrap"> */}
            <div>
              <Notes />
              <Route path="/home/new-note" component={NewNoteForm} />
            </div>
            <div>
              <Chores />
              <Route path="/home/new-chore" component={NewChoreForm} />
            </div>
            <div>
              <Bills />
              <Route path="/home/new-bill" component={NewBillForm} />
            </div>
            {/* </div> */}
          </> :
          <p> Please log-in. <Link to="/">Login</Link> </p>
        }
      </Route>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <textarea></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>

    </div >
  );
}

export default App;
