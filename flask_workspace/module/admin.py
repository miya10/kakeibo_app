import mysql.connector
import configparser

def admin_login(password):
    if password == 'a':
        status = 'Success'
        message = ''
    elif password == '':
        status = 'Failed'
        message = 'パスワードを入力してください。'
    else:
        status = 'Failed'
        message = 'パスワードが正しくありません。'
    return status, message

def get_user():
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
    
    cur.execute('SELECT name, email FROM user_data;')
    table_arr = cur.fetchall()

    return table_arr

def delete_user(email):
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

    cur.execute('DELETE FROM user_data WHERE email = "{}";'.format(email))
    conn.commit()
    status = 'Success'
    message = ''
    
    cur.close()
    conn.close()
    return status, message