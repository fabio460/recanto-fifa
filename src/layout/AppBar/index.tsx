import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Artilharia from './Artilharia';
import InserirResultado from './InserirResultado';


function Appbar() {
  const h = useNavigate()
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        
        <Navbar.Brand href="#home">Recanto </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="">Criar Usuário</Nav.Link>
            <Nav.Link href="" ><InserirResultado/></Nav.Link>
            <Nav.Link href="" ><Artilharia/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;