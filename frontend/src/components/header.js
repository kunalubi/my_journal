// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
              src="/logo.jpg" 
              alt="Journal Logo" 
              style={styles.logo}
            />
            <h1 style={styles.mainTitle}>Demo Journal</h1>
          </div>
        </Container>
      </div>
      <Navbar style={styles.navbar} expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 justify-content-between">
              <Nav.Link href="/" style={styles.navLink}>Home</Nav.Link>
              <Nav.Link href="/about" style={styles.navLink}>About Us</Nav.Link>
              <Nav.Link href="/current-issue" style={styles.navLink}>Current Issue</Nav.Link>
              <Nav.Link href="/archives" style={styles.navLink}>Archives</Nav.Link>
              <Nav.Link href="/submit" style={styles.navLink}>Submit Manuscript</Nav.Link>
              <Nav.Link href="/editorial-board" style={styles.navLink}>Editorial Board</Nav.Link>
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
