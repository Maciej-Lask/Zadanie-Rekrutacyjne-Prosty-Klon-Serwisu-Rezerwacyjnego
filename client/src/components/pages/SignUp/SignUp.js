import { Container } from 'reactstrap';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { API_URL } from '../../../config';

const SignUp = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(null); // null, success, serverError, clientError, loginError, loading

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    };
    setStatus('loading');
    fetch(`${API_URL}auth/register`, options).then((res) => {
      if (res.status === 201) {
        setStatus('success');
        navigate('/');
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if (res.status === 409) {
        setStatus('loginError');
      } else {
        setStatus('serverError');
      }
      return res.json();
    });
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Sign Up Here</h1>

      {status === 'loading' && (
        <Spinner
          color="primary"
          className="standard-box d-block me-auto ms-auto"
        />
      )}

      {status === 'success' && (
        <Alert variant="success" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Registered successfully!
          </Alert.Heading>
          <p>You will be navigated to the main page in 3 seconds</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Error while registering!
          </Alert.Heading>
          <p>Please try again</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Not enough data!
          </Alert.Heading>
          <p>Please fill all fields</p>
        </Alert>
      )}

      {status === 'loginError' && (
        <Alert variant="warning" className="rounded">
          <Alert.Heading style={{ color: 'white' }}>
            Login already in use!
          </Alert.Heading>
          <p>Try using another login</p>
        </Alert>
      )}

      <Form className="standard-box" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Enter login"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
