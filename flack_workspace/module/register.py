import mysql.connector
import configparser

def signup(email, user_name, password):
    inifile = configparser.ConfigParser()
    inifile.read("config/database.ini")

    conn = mysql.connector.connect(
        host='localhost',
        port='3306',
        user='root',
        database='kakeibo'
    )
    conn.ping(reconnect=True)
    cur = conn.cursor(buffered=True)
    cur.execute("USE kakeibo")
    
    cur.execute('SELECT * FROM user_data WHERE email = "{}" limit 1'.format(email))
    if email == '' or user_name == '' or password == '':
        status = 'Failed'
        message = '全ての項目を入力してください。'
    elif len(cur.fetchall()) == 0:
        cur.execute('INSERT INTO user_data VALUES("{}","{}","{}")'.format(email, user_name, password))
        table_name = email.replace('@', '_').replace('-', '_').replace('.', '_')
        cur.execute('''CREATE TABLE {} (
                date date,
                detail varchar(50),
                category varchar(50),
                amount int(10)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;'''.format(table_name))
        conn.commit()
        status = 'Success'
        message = ''
    else:
        status = 'Failed'
        message = '登録されたユーザーは既に存在しています。'
    cur.close()
    conn.close()
    return status, message

def login(email, password):
    inifile = configparser.ConfigParser()
    inifile.read("config/database.ini")

    conn = mysql.connector.connect(
        host='localhost',
        port='3306',
        user='root',
        database='kakeibo'
    )
    conn.ping(reconnect=True)
    cur = conn.cursor(buffered=True)
    cur.execute("USE kakeibo")
    
    cur.execute('SELECT * FROM user_data WHERE email = "{}" AND password = "{}" limit 1'.format(email, password))

    if email == '' or password == '':
        status = 'Failed'
        message = '全ての項目を入力してください。'
    elif len(cur.fetchall()) == 1:
        status = 'Success'
        message = ''
    else:
        status = 'Failed'
        message = 'メールアドレスかパスワードに誤りがあります。'
    cur.close()
    conn.close()
    return status, message
