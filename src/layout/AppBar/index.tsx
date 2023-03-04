import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import ModalArtilharia from './modalArtilharia';
import ModalColocacao from './modalColocacao';
import ModalCriarUsuario from './modalCriarUsuario';
import ModalDeletarUsuario from './modalDeletarUsuario';
import ModalVitoriasEGols from './modalVitoriasEGols';


function Appbar() {
  const h = useNavigate()
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        
        <Navbar.Brand href="#home">Recanto </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href=""><ModalCriarUsuario/></Nav.Link>
            <Nav.Link href=""><ModalDeletarUsuario/></Nav.Link>
            <Nav.Link href="" ><ModalColocacao/></Nav.Link>
            <Nav.Link href="" ><ModalArtilharia/></Nav.Link>
            <Nav.Link href="" ><ModalVitoriasEGols/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;