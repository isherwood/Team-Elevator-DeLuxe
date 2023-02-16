import {Container, Row} from 'react-bootstrap';

import './App.css';
import Elevator from "./components/Elevator/Elevator";

function App() {
    return (
        <Container fluid className='app-container d-flex flex-column vh-100'>
            <Row>
                <h1 className='display-5 fst-italic text-primary text-center'>Team Elevator De Luxe</h1>
            </Row>

            <Row className='flex-grow-1 justify-content-center align-items-center'>
                <Elevator/>
            </Row>
        </Container>
    );
}

export default App;
