// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div style={styles.topStrip}>
        <Container className="d-flex justify-content-end">
          <div className="d-flex gap-2">
            <Button size="sm" variant="link" style={styles.stripButton} onClick={handleLogin}>Login</Button>
            <span style={styles.divider}>|</span>
            <Button size="sm" variant="link" style={styles.stripButton} onClick={handleRegister}>Register</Button>
          </div>
        </Container>
      </div>
      <div style={styles.topHeader}>
        <Container className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img 
              src="/images/logoo.jpg" 
              alt="Journal Logo" 
              style={styles.logo}
            />
            <h1 style={styles.mainTitle}>Demo Journal</h1>
          </div>
        </Container>
      </div>
      <Navbar expand="lg" style={styles.navbar}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 justify-content-between">
              <Nav.Link href="/" style={styles.navLink}>Home</Nav.Link>
              <Nav.Link href="/journal_info" style={styles.navLink}>Journal Info</Nav.Link>
              <NavDropdown title="Editorial" id="basic-nav-dropdown" style={styles.navLink}>
                <NavDropdown.Item href="/editorial_team">Editorial Team</NavDropdown.Item>
                <NavDropdown.Item href="/editorial_guidelines">Editorial Guidelines</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Reviewer" id="basic-nav-dropdown" style={styles.navLink}>
                <NavDropdown.Item href="/reviewer_team">Reviewer Team</NavDropdown.Item>
                <NavDropdown.Item href="/reviewer_role">Reviewer Role</NavDropdown.Item>
                <NavDropdown.Item href="/join_as_reviewer">Join a Reviewer</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Author" id="basic-nav-dropdown" style={styles.navLink}>
                <NavDropdown.Item href="/authors_instructions">Author Instructions</NavDropdown.Item>
                <NavDropdown.Item href="/publication_ethics">Publication Ethics</NavDropdown.Item>
                <NavDropdown.Item href="/publication_fee">Publication Fee</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/submit_manuscript" style={styles.navLink}>Submit Manuscript</Nav.Link>
              <NavDropdown title="Articles" id="basic-nav-dropdown" style={styles.navLink}>
                <NavDropdown.Item href="/current_articles">Current Articles</NavDropdown.Item>
                <NavDropdown.Item href="/archive">Archive</NavDropdown.Item>
                <NavDropdown.Item href="/online_first">Online First</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact" style={styles.navLink}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const styles = {
  topStrip: {
    backgroundColor: '#333',
    padding: '4px 0',
    color: '#fff'
  },
  stripButton: {
    color: '#fff',
    padding: '2px 8px',
    fontSize: '13px',
    textDecoration: 'none'
  },
  divider: {
    color: '#666',
    alignSelf: 'center',
    fontSize: '12px'
  },
  topHeader: {
    backgroundColor: '#f0f9ff',
    padding: '20px 0',
    borderBottom: '1px solid #e0e0e0'
  },
  logo: {
    height: '60px',
    marginRight: '20px'
  },
  mainTitle: {
    color: '#333',
    fontSize: '28px',
    margin: 0,
    fontWeight: '500'
  },
  navbar: {
    backgroundColor: '#0098da',
    padding: '0'
  },
  navLink: {
    color: '#fff !important',
    padding: '15px 20px !important',
    fontSize: '15px',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  }
};

export default Header;
