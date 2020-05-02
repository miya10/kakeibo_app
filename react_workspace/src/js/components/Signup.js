import React from "react";
import axios from 'axios';
import { Button, Col, Row, Container, Form, Alert }  from 'react-bootstrap';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {alert: '', email: ''}
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(e) {
    e.preventDefault();
    const req = { 'email': this.formEmail.value, 'name': this.formName.value, 'password': this.formPassword.value };
    axios.post('http://localhost:5000/signup', req)
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
        console.log('APIコールに失敗しました。');
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
                <Form.Control type="email" placeholder="sample@example.com" ref={input => this.formEmail = input} />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>名前</Form.Label>
                <Form.Control type="text" ref={input => this.formName = input}/>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>パスワード</Form.Label>
                <Form.Control type="password" ref={input => this.formPassword = input} />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.handleSignup}>
                新規登録
              </Button>
            </Form>
            <Alert style={{ color: 'red' }}>{alert}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}