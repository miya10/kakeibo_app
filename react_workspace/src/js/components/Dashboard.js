import React from "react";
import axios from 'axios';
import { Table, Button, Col, Container, Row, Form }  from 'react-bootstrap';

export default class Kakeibo extends React.Component {

  getTable() {
    const req = {'user': this.props.location.state.email};
    axios.post('http://localhost:5000/get_table', req)
      .then((results) => {
        const data = results.data;
        return data.table;
      },
      )
      .catch(() => {
        console.log('APIコールに失敗しました。');
      });
  }

  renderTable() {
    // const arr = [['Red','Yellow','Green','Blue','V'],['id2','Yellow','Green','Blue','Violet']];
    const arr = this.table_arr;
    console.log(arr)
    const rows = arr.map((val,index) =>
      <tr key={val}>
        <td>{val[0]}</td>
        <td>{val[1]}</td>
        <td>{val[2]}</td>
        <td>{val[3]}</td>
        <td><Button>削除</Button></td>
      </tr>
    );
    
    return (
      <Table hover>  
        <thead>
          <tr>
            <th>日付</th>
            <th>用途</th>
            <th>カテゴリ</th>
            <th>金額</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
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
              <Button variant="primary" type="submit" onClick={this.handleSignup}>
                リロード
              </Button>
            </Form>
          </Col>
        </Row>
        {this.renderTable()}
      </Container>
    );
  }
}