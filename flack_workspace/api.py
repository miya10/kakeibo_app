import os
import json
from flask import Flask, Response, jsonify, request
from flask_cors import CORS

from module.register import *
from module.table import *

app = Flask(__name__)
CORS(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    user_name = data['name']
    password = data['password']

    status, message = register(email, user_name, password)
    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    status, message = check_user(email, password)
    res = {
        'status': status,
        'message': message
    }
    return jsonify(res)

@app.route('/get_table', methods=['POST'])
def table():
    data = request.get_json()
    user = data['user']

    table_name = user.replace('@', '_').replace('-', '_').replace('.', '_')
    table_arr = get_table(table_name)
    res = {
        'table': table_arr
    }
    print(res)
    return jsonify(res)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)