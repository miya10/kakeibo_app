import mysql.connector
import configparser

def get_table(table_name):
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
    
    cur.execute('''SELECT DATE_FORMAT(date, "%Y/%m/%d"),
                    detail,
                    category,
                    amount
                    FROM {}
                    ORDER BY date
                '''.format(table_name))
    table_arr = cur.fetchall()

    return table_arr

def add_item(table_name, date, detail, category, amount):
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

    
    if date == '' or detail == '' or category == '' or amount == '':
        status = 'Failed'
        message = '全ての項目を入力してください。'
        return status, message

    cur.execute('SELECT * FROM {} WHERE date = "{}" AND detail = "{}" AND category = "{}" AND amount = "{}" limit 1'.format(table_name, date, detail, category, amount))

    if len(cur.fetchall()) == 0:
        try:
            cur.execute('INSERT INTO {} VALUES("{}","{}","{}","{}")'.format(table_name, date, detail, category, amount))
            conn.commit()
            status = 'Success'
            message = ''
        except:
            status = 'Failed'
            message = '不正な入力です。'
    else:
        status = 'Failed'
        message = '同一アイテムが既に存在します。'
        
    cur.close()
    conn.close()
    return status, message

def delete_item(table_name, date, detail, category, amount):
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
    date = date.replace('/', '-')
    cur.execute('DELETE FROM {} WHERE date = "{}" AND detail = "{}" AND category = "{}" AND amount = "{}";'.format(table_name, date, detail, category, amount))
    conn.commit()
    status = 'Success'
    message = ''
    
    cur.close()
    conn.close()
    return status, message