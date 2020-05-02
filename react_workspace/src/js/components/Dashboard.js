import React from "react";
import { Table, Button, Col, Container, Row, Form  }  from 'react-bootstrap';

export default class Kakeibo extends React.Component {
  render() {
    return (
      // <Button>{this.props.location.state.email}</Button>
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
          </Col>
        </Row>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}