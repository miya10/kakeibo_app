import React from "react";
import axios from 'axios';
import { Table, Button, Col, Container, Row, Form, Alert }  from 'react-bootstrap';

export default class AdminSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {table: [], alert: ''};
    this.reloadUserTable = this.reloadUserTable.bind(this);
    this.renderUserTable = this.renderUserTable.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }

  componentWillMount() {
    this.reloadUserTable();
  }

  handleUserDelete(email) {
    const req = { 'email': email };
    axios.post('http://localhost:5000/delete_user', req)
      .then((results) => {
        const data = results.data;
        console.log(data);
        if (data.status == 'Success') {
          this.reloadUserTable();
        }
      },
    )
    .catch(() => {
        console.log('アイテム削除に失敗しました。');
    });
  }

  reloadUserTable(){
    axios.post('http://localhost:5000/get_user')
      .then((results) => {
        const data = results.data;
        console.log(data);
        this.setState({table: data.table});
      },
      )
      .catch(() => {
        console.log('テーブル読み込みに失敗しました。');
      });
  }

  renderUserTable() {
    const arr = this.state.table;
    const rows = arr.map((val,index) =>
      <tr key={val}>
        <td>{val[0]}</td>
        <td>{val[1]}</td>
        <td><Button onClick={() => this.handleUserDelete(val[1])}>削除</Button></td>
      </tr>
    );
    
    return (
      <Table hover>  
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
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
    const alert = this.state.alert;
    return (
      <Container style={{padding: 15}}>
        {this.renderUserTable()}
        <Row className='text-center'>
          <Col>
            <Alert style={{ color: 'red' }} >{alert}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}