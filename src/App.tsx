import React from 'react';
import ConvertForm from "./components/convertForm";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <main>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Number Converter</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="p-3">
        <ConvertForm/>
      </Container>
    </main>
  );
}

export default App;
