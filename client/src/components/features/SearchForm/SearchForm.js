import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <Container>
      <Form className="d-flex flex-row  text-center">
        <Form.Group className="w-100" controlId="searchTerm">
          <Form.Control
            type="text"
            placeholder="Search by name" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button className="m-0" variant="outline-dark" onClick={handleSearch}>
          <FaMagnifyingGlass />
        </Button>
      </Form>
    </Container>
  );
};

export default SearchForm;
