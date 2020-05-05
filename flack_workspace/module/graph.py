import mysql.connector
import configparser
import pandas as pd
import matplotlib.pyplot as plt
import japanize_matplotlib
import os
import random, string
from glob import glob

def update_graph(table_name):
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
                    category,
                    amount
                    FROM {}
                    ORDER BY date
                '''.format(table_name))
    table_arr = cur.fetchall()
    file_path = draw_graph(table_arr)

    return file_path

def draw_graph(arr):
    if arr == []:
        arr = [(0, 0, 0)]
    df = pd.DataFrame(arr)
    df.columns = ['date', 'category', 'amount']
    fig = plt.figure(figsize=(8, 4))
    ax = fig.add_subplot(1,1,1)
    df=df.pivot_table( values ='amount',index = ['date'], columns = ['category'], aggfunc = sum )

    df.plot(ax =ax ,kind='bar' , stacked=True)

    plt.xlabel("", fontsize=7)
    plt.xticks(rotation=0)
    plt.ylabel("", fontsize=7)
    plt.subplots_adjust(bottom = 0.3)
    plt.tick_params(labelsize=7)
    plt.legend(bbox_to_anchor=(1.02, 1), loc='upper left', borderaxespad=0, fontsize=7)
    plt.subplots_adjust(left = 0.1, right = 0.8)

    old_filename = glob('/Users/miyaguchinaoki/code/kakeibo/react_workspace/src/images/graph*.png')
    os.remove(old_filename[0])
    filename = 'graph' + ''.join(random.choices(string.ascii_letters + string.digits, k=7)) + '.png'
    file_path = '/Users/miyaguchinaoki/code/kakeibo/react_workspace/src/images/'+filename
    plt.savefig(file_path)
    file_path = '../../images/'+filename
    return file_path