from flask import jsonify, session
import pandas as pd
import csv
import urllib.request
import requests
import io
import json
from datetime import datetime, date


# EXAMPLE URL
# url = 'http://chart.finance.yahoo.com/table.csv?s=MSFT&a=0&b=7&c=2017&d=1&e=7&f=2017&g=d&ignore=.csv'
#
# 

# def session_set(user):
#     session['logged-in'] = True
#     session['user_id'] = user.id
#     session['username'] = user.username
#     session['password'] = user.password
#     session['first_name'] = user.first_name
#     session['last_name'] = user.last_name
#     session['email'] = user.email
#     session['user_created'] = user.date_created


def user_to_JSON(user):
    user_dict = {
        'user_id': user.id,
        'username':user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email':user.email
    }
    return json.dumps(user_dict)


def make_stock_list(ticker):
    ticker = ticker.upper()
    print(ticker)
    d = date.today()
    month = str(d.month-1)
    day = str(d.day)
    year = str(d.year)
    url = 'http://chart.finance.yahoo.com/table.csv?s='+ticker+'&a='+month+'&b='+day+'&c=2016&d='+month+'&e='+day+'&f='+year+'&g=d&ignore=.csv'
    s=requests.get(url).content
    dataframe = pd.read_csv(io.StringIO(s.decode('utf-8')))
    price_list = []
    date_list = []
    dataframe = dataframe.sort_index(axis=0 ,ascending=False)
    for index, row in dataframe.iterrows():
        price_list.append(row.Close)
        date_list.append(row.Date)
    stock_product = {
            "company" : ticker,
            "price_list": price_list,
            "date_list": date_list
    }
    return stock_product
    
def etf_pricer_final(etf):
    composition = etf.ETF_comp
    x=[]
    for key, value in composition.items():
        z= [value[1]] + make_stock_list(key)['price_list']
        x.append(z)

    master_list=[]
    for i in range(1,len(x[0])):
        new_list=[]
        for array in x:
            new_list.append(array[i]*array[0])
        master_list.append(sum(new_list))
    sp = make_stock_list('^GSPC')
    final_product={
            'Name':etf.ETF_name,
            'date_list': sp['date_list'],
            'SandP': sp['price_list'],
            'etf': master_list

    }
    return json.dumps(final_product)

# def etf_pricer_final(composition):
#     for key,index in composition.items():
#         key['company'] = make_stock_list(key)['price_list']

#     sp = make_stock_list('^GSPC')
#     w_appl = 0.4
#     w_ibm = 0.3
#     w_msft = 0.3
#     etf_price_list = []
#     for i in range(0,len(sp['price_list'])):
#         output = aapl[i]*w_appl + ibm[i]*w_ibm + msft[i]*w_msft
#         etf_price_list.append(output)
#     final_product={
#             'Name':'Techie',
#             'date_list': sp['date_list'],
#             'SandP': sp['price_list'],
#             'etf': etf_price_list

#     }
#     print(len(etf_price_list))
#     print(len(sp['price_list']))
#     print(len(sp['date_list']))
#     return json.dumps(final_product)


def etf_to_JSON(etf):
    etf_dict={
            'id': etf.id,
            'ETF_name': etf.ETf_name,
            'ETF_descr': etf.ETF_descr,
            'ETF_comp': etf.ETF_comp,
            'last_price': etf.last_price,
            'creation_date': etf.creation_date
    }
    return etf_dict


def grab_articles():
    news_url = ('https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=c4208eaed7204bc880581f157f1a3c87')
    answer = requests.get(news_url).json()
    news_dict= answer['articles']
    outbound_news_list = []
    for news_article in news_dict:
        news_obj = []
        news_obj.append(news_article['title'])
        news_obj.append(news_article['url']) 
        news_obj.append(news_article['urlToImage'])
        news_obj.append(news_article['description'])
        outbound_news_list.append(news_obj)
    return outbound_news_list


def create_etf(etf_info):
    answer = ETF.query.filter_by(ETF_name = etf_info['name']).first()
    if answer:
        return False
    else:
        new_ETF = ETF(etf_info['name'],etf_info['description'],etf_info['composition'], etf_info['last_price'])
        db.session.add(new_ETF)
        db.session.commit()
        return True


def price_etf(composition):
    result = 0
    for key, value in composition.items():

            result += float(value[0]) * float(value[1])
    return round(result,2)


def etf_comp_into_array(etf_comp):
    new_list = []
    for key, value in etf_comp.items():
        x = [key,value[1]]
        new_list.append(x)
    final_product = {'result': new_list}
    print(new_list)
    print(final_product)
    return json.dumps(final_product)



# FUNCTION TESTING

# print(etf_pricer_final('aapl','ibm','msft'))


# x = make_stock_list("msft")
# print(x)

# x = {'key': [1,2], 'key2': [1,3]}
# print(price_etf(x))


# pickle = {
#     'IBM':[100, 0.3],
#     'MSFT':[40, 0.3],
#     'AAPL':[80, 0.4]
#     }

# print(etf_comp_into_array(pickle))