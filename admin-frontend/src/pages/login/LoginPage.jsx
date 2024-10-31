import React, { useContext, useState } from 'react';
import { Tab, Tabs, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context/contextAPI';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { setUser, user } = useContext(UserContext);
    const [key, setKey] = useState('login');
    const [signupEmail, setSignupEmail] = useState('');
    const [name, setName] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (signupPassword !== signupConfirmPassword) {
            Swal.fire({
                heightAuto: false,
                icon: "error",
                title: "Oops...",
                text: "Passwords do not match!",
            });
            return;
        }

        Swal.fire({
            heightAuto: false,
            title: "Loading...",
            text: "Please wait",
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch('http://localhost:5002/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: signupEmail, password: signupPassword, first_name: name }),
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                Swal.close();
                throw new Error('Invalid JSON response');
            }

            Swal.close();

            if (response.ok) {
                Swal.fire({
                    heightAuto: false,
                    icon: "success",
                    title: "Nice!",
                    text: data.message,
                });
                setUser(data.user.email);
                localStorage.setItem('user', data.user.email);
                navigate(`/Home`);
            } else {
                Swal.fire({
                    heightAuto: false,
                    icon: "error",
                    title: "Oops...",
                    text: data.error || 'Error signing up',
                });
            }
        } catch (error) {
            Swal.close();
            console.error('Error during signup:', error);
            Swal.fire({
                heightAuto: false,
                icon: "error",
                title: "Oops...",
                text: 'Something went wrong. Please try again later.',
            });
        }
    };



    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error('Invalid JSON response');
        }

        if (response.ok) {
            // alert(data.message);
            Swal.fire({
                heightAuto: false,
                icon: "success",
                title: "Nice!",
                text: data.message,
            });
            //add user email to context user var
            setUser(data.user.email)
            localStorage.setItem('user', data.user.email)
            navigate(`/Home`)
        } else {
            // alert(data.error || 'Error logging in');
            Swal.fire({
                heightAuto: false,
                icon: "error",
                title: "Oops...",
                text: data.error || 'Error logging in',
            });
        }
    };

    return (
        <Container className=' h-100' style={{ backgroundColor: localStorage.getItem("theme") === 'dark' ? "#121212" : '#fff' }}>
            {/* {console.log(user)} */}
            <Row className=" h-100 align-items-center">
                <Col md={6} className='card p-5 bg-light mx-auto'>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="login" title="Login">
                            <Form onSubmit={handleLoginSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="Enter email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)} />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3">
                                    Login
                                </Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="signup" title="Sign Up">
                            <Form onSubmit={handleSignupSubmit}>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        placeholder="Enter your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={signupConfirmPassword}
                                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3">
                                    Sign Up
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
