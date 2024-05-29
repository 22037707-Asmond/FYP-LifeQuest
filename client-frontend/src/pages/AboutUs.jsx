import React from 'react';
import HomepageHeader from '../components/homepageHeader';
import { Container, Row, Col } from 'react-bootstrap';

function AboutUs() {
  return (
    <div>
      <HomepageHeader />
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>About Us</h1>
            <p>Welcome to our website! We are a team of passionate individuals dedicated to providing the best user experience for our customers.</p>
            <p>Feel free to explore our website and learn more about our mission, values, and the services we offer.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AboutUs;
