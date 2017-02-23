import urllib.request
import requests
import pandas as pd
import io
import time



input_url = "http://dev.markitondemand.com/Api/v2/Lookup/json?input=Apple"
stock_list = requests.get(input_url).json()
for stock_obj in stock_list:
	# print(stock_obj)
	if stock_obj['Name'] and stock_obj['Name'] != ' ':
		print(stock_obj)
		print(stock_obj['Name'])
		print(type(stock_obj['Name']))
	else:
		pass