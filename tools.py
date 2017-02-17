from flask import jsonify, session
import pandas as pd
import csv
import urllib.request
import requests
import io


# EXAMPLE URL
# url = 'http://chart.finance.yahoo.com/table.csv?s=MSFT&a=0&b=7&c=2017&d=1&e=7&f=2017&g=d&ignore=.csv'
# 



def session_set(user):
	session['logged-in'] = True
	session['user_id'] = user.id
	session['username'] = user.username
	session['password'] = user.password
	session['first_name'] = user.first_name
	session['last_name'] = user.last_name
	session['email'] = user.email
	session['user_created'] = user.date_created


def make_stock_list(ticker):
	ticker = ticker.upper()
	print(ticker)
	url = "http://chart.finance.yahoo.com/table.csv?s=IBM&a=0&b=17&c=2017&d=1&e=17&f=2017&g=d&ignore=.csv"
	# url = "http://chart.finance.yahoo.com/table.csv?s="+ticker+"&a=0&b=7&c=2007&d=1&e=17&f=2017&g=d&ignore=.csv"
	s=requests.get(url).content
	
	# ERROR MUST BE TRAPPED
	# if "404" in str(s):
	# 	print("error")
	# 	print(str(s))
	# else:
	dataframe = pd.read_csv(io.StringIO(s.decode('utf-8')))

	price_list = []

	for index, row in dataframe.iterrows():
		price_list.append(row.Close)
	return price_list



def etf_to_JSON(etf):
	etf_dict={
			'id': etf.id,
			'ETF_name': etf.ETf_name,
			'ETF_descr': etf.ETF_descr,
			'ETF_comp': etf.ETF_comp,
			'last_price': etf.last_price,
			'creation_date': etf.creation_date
	}
	return jsonify(etf_dict)


def grab_articles():
	news_url = ('https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=c4208eaed7204bc880581f157f1a3c87')
	answer = requests.get(news_url).json()
	news_dict= answer['articles']
	outbound_news_list = []
	for news_article in news_dict:
		news_obj = []
		news_obj.append(news_article['title'])
		news_obj.append(news_article['url']) 
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

# FUNCTION TESTING


# grab_articles()


make_stock_list("msft")