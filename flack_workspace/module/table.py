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
    
    cur.execute('SELECT * FROM {}'.format(table_name))
    table_arr = cur.fetchall()
    return table_arr