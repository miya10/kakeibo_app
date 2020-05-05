import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Container, Form, Alert }  from 'react-bootstrap';

export default class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {alert: ''}
    this.handleAdminLogin = this.handleAdminLogin.bind(this);
  }

  handleAdminLogin(e) {
    e.preventDefault();
    const req = { 'password': this.formPassword.value };
    axios.post('http://localhost:5000/admin_login', req)
      .then((results) => {
        const data = results.data;
        console.log(data);
        this.setState({alert: data.message});
        if (data.status == 'Success') {
          this.props.history.push({
            pathname: '/admin'
          });
        }
      },
      )
      .catch(() => {
        console.log('管理者ログイン処理に失敗しました。');
      });
    }
    

  render() {
    const alert = this.state.alert;
    return (
      <Container style={{padding: 15}}>
        <Row className='text-center'>
          <Col>
            <Form>

              <Form.Group controlId="formPassword">
                <Form.Label>パスワード</Form.Label>
                <Form.Control type="password" ref={input => this.formPassword = input}/>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.handleAdminLogin}>
                管理者権限でログイン
              </Button>
            </Form>
            <Alert style={{ color: 'red' }}>{alert}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}