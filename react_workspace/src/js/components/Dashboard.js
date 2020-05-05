import React from "react";
import axios from 'axios';
import { Table, Button, Col, Container, Row, Form, Alert }  from 'react-bootstrap';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {table: [], alert: ''};
    this.reloadTable = this.reloadTable.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.reloadTable();
  }

  handleAdd(e) {
    e.preventDefault();
    const req = {
      'user': this.props.location.state.email,
      'date': this.formDate.value,
      'detail':this.formDetail.value,
      'category': this.formCategory.value,
      'amount': this.formAmount.value };
    axios.post('http://localhost:5000/add_item', req)
      .then((results) => {
        const data = results.data;
        console.log(data);
        this.setState({alert: data.message});
        if (data.status == 'Success') {
          this.reloadTable();
        }
      },
      )
      .catch(() => {
        console.log('アイテム追加に失敗しました。');
      });
    }

    handleDelete(date, detail, category, amount) {
      const req = {
        'user': this.props.location.state.email,
        'date': date,
        'detail': detail,
        'category': category,
        'amount': amount };
      axios.post('http://localhost:5000/delete_item', req)
        .then((results) => {
          const data = results.data;
          console.log(data);
          if (data.status == 'Success') {
            this.reloadTable();
          }
        },
        )
        .catch(() => {
          console.log('アイテム削除に失敗しました。');
        });
      }

  reloadTable(){
    const req = {'user': this.props.location.state.email};
    axios.post('http://localhost:5000/get_table', req)
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

  renderTable() {
    const arr = this.state.table;
    const rows = arr.map((val,index) =>
      <tr key={val}>
        <td>{val[0]}</td>
        <td>{val[1]}</td>
        <td>{val[2]}</td>
        <td>{val[3]}</td>
        <td><Button onClick={() => this.handleDelete(val[0], val[1], val[2], val[3])}>削除</Button></td>
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
    const alert = this.state.alert;
    return (
      <Container style={{padding: 15}}>
        <Form>
          <Form.Row className='form-inline'>
            <Col>
              <Form.Group controlId="formDate">
                <Form.Label>日付：</Form.Label>
                <Form.Control type="date" ref={input => this.formDate = input}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formDetail">
                <Form.Label>用途：</Form.Label>
                <Form.Control type="text" placeholder='テキストを入力' ref={input => this.formDetail = input}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCategory">
                <Form.Label>カテゴリー：</Form.Label>
                <Form.Control as="select" ref={input => this.formCategory = input}>
                  <option>食費</option>
                  <option>日用品</option>
                  <option>電化製品</option>
                  <option>交通費</option>
                  <option>学費</option>
                  <option>趣味</option>
                  <option>雑費</option>
                </Form.Control>
               </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formAmount">
                <Form.Label>金額：</Form.Label>
                <Form.Control type="int" placeholder='円' ref={input => this.formAmount = input}/>
              </Form.Group>
            </Col>

            <Button variant="primary" type="submit" onClick={this.handleAdd}>
              追加
            </Button>
          </Form.Row>
        </Form>
        <Row className='text-center'>
          <Col>
            <Alert style={{ color: 'red' }} >{alert}</Alert>
          </Col>
        </Row>
        {this.renderTable()}
      </Container>
    );
  }
}