import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Container, Form, Alert }  from 'react-bootstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {alert: '', email: ''}
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    const req = { 'email': this.formEmail.value, 'password': this.formPassword.value };
    axios.post('http://localhost:5000/login', req)
      .then((results) => {
        const data = results.data;
        console.log(data);
        this.setState({alert: data.message});
        if (data.status == 'Success') {
          this.props.history.push({
            pathname: '/dashboard',
            state: { email: this.formEmail.value}
          });
        }
      },
      )
      .catch(() => {
        console.log('ログイン処理に失敗しました。');
      });
    }
    

  render() {
    const alert = this.state.alert;
    return (
      <Container style={{padding: 15}}>
        <Row className='text-center'>
          <Col>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>メールアドレス</Form.Label>
                <Form.Control type="email" placeholder="sample@example.com" ref={input => this.formEmail = input}/>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>パスワード</Form.Label>
                <Form.Control type="password" ref={input => this.formPassword = input}/>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.handleLogin}>
                ログイン
              </Button>
            </Form>
            <Alert style={{ color: 'red' }}>{alert}</Alert>
          </Col>
        </Row>
        
        <Row className='text-center'>
          <Col>
            <Link to='/signup'>
              <Button variant='light'>新規登録はこちらから</Button>
            </Link>
          </Col>
        </Row>
        <Row className='text-center' style={{padding: 15}}>
          <Col>
            <Link to='/admin_login'>
              <Button variant='light'>管理者はこちらから</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}