import os
import json
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')

from module.register import *
from module.table import *
from module.admin import *
from module.graph import *

app = Flask(__name__)
CORS(app)

@app.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()
    email = data['email']
    user_name = data['name']
    password = data['password']

    status, message = signup(email, user_name, password)
    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

@app.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    status, message = login(email, password)
    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

@app.route('/admin_login', methods=['POST'])
def handle_admin_login():
    data = request.get_json()
    password = data['password']

    status, message = admin_login(password)

    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

@app.route('/get_user', methods=['POST'])
def handle_get_user():
    table_arr = get_user()
    res = {
        'table': table_arr
    }
    return jsonify(res)

@app.route('/delete_user', methods=['POST'])
def handle_delete_user():
    data = request.get_json()
    email = data['email']

    status, message = delete_user(email)
    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

@app.route('/get_table', methods=['POST'])
def handle_get_table():
    data = request.get_json()
    user = data['user']

    table_name = user.replace('@', '_').replace('-', '_').replace('.', '_')
    table_arr = get_table(table_name)
    graph_path = update_graph(table_name)
    print(graph_path)
    res = {
        'table': table_arr,
        'graph_path': graph_path
    }
    return jsonify(res)

@app.route('/add_item', methods=['POST'])
def handle_add_item():
    data = request.get_json()
    user = data['user']
    date = data['date']
    detail = data['detail']
    category = data['category']
    amount = data['amount']

    table_name = user.replace('@', '_').replace('-', '_').replace('.', '_')
    status, message = add_item(table_name, date, detail, category, amount)
    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

@app.route('/delete_item', methods=['POST'])
def handle_delete_item():
    data = request.get_json()
    user = data['user']
    date = data['date']
    detail = data['detail']
    category = data['category']
    amount = data['amount']

    table_name = user.replace('@', '_').replace('-', '_').replace('.', '_')
    status, message = delete_item(table_name, date, detail, category, amount)
    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)