import pandas as pd
import csv
import urllib.request
import requests
import io

# EXAMPLE URL
# url = 'http://chart.finance.yahoo.com/table.csv?s=MSFT&a=0&b=7&c=2017&d=1&e=7&f=2017&g=d&ignore=.csv'
# 


def make_list(ticker):
	ticker = ticker.upper()
	print(ticker)
	url = "http://chart.finance.yahoo.com/table.csv?s="+ticker+"&a=0&b=7&c=2017&d=1&e=7&f=2017&g=d&ignore=.csv"
	s=requests.get(url).content
	
	# ERROR MUST BE TRAPPED
	if "404" in str(s):
		print("error")
		pass
	else:
		dataframe = pd.read_csv(io.StringIO(s.decode('utf-8')))

		price_list = []

		for index, row in dataframe.iterrows():
			price_list.append(row.Close)
		print(price_list)


make_list("msft")


# @app.route("/marielys", method="GET")
# def my_func():
# 	return render_template("base.html")

