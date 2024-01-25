import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import styles from'./MainMenu.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../../features/SearchForm/SearchForm';

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed-top bg-light mainNav">
      <Navbar expand="md" className="animated fadeIn">
        <NavbarToggler className="position-absolute" onClick={toggle}>
          <FaBars />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className={`d-flex ms-auto align-items-center ${styles.navbar}`}
            navbar
          >
            <SearchForm />
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/terms-of-use">Terms of use</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/privacy-policy">Privacy policy</NavLink>
            </NavItem>
            {!user ? (
              <>
                <NavItem className="d-block d-xl-block">
                  <NavLink href="/sign-up">Register</NavLink>
                </NavItem>
                <NavItem className="d-block d-xl-block">
                  <NavLink href="/sign-in">Log In</NavLink>
                </NavItem>
              </>
            ) : (
              // User is logged in
              <>
                <NavItem className="d-block d-xl-block">
                  <NavLink href="/sign-out">Log Out</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/ad/add">
                    <Button className="btn-outline" outline color="success">
                      Post ad
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
