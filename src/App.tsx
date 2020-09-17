// react
import React from 'react';

// react-bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// components
import NavbarComponent from './components/NavbarComponent';
import IntroductionComponent from './components/IntroductionComponent';
import AcquaintanceComponent from './components/AcquaintanceComponent';
import UsersComponent from './components/UsersComponent';
import RegistrationComponent from './components/RegistrationComponent';
import FooterComponent from './components/FooterComponent';

const App: React.FunctionComponent = () => {
    return (
        <>
            <Container className="fixed-top">
                <Row>
                    <Col className="p-0">
                        <NavbarComponent />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="p-0">
                        <IntroductionComponent />
                    </Col>
                </Row>
                <Row>
                    <Col className="p-0">
                        <AcquaintanceComponent />
                    </Col>
                </Row>
                <Row>
                    <Col className="p-0">
                        <UsersComponent />
                    </Col>
                </Row>
                <Row>
                    <Col className="p-0">
                        <RegistrationComponent />
                    </Col>
                </Row>
                <Row>
                    <Col className="p-0">
                        <FooterComponent />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App