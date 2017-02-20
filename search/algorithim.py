from models import db, Company
import urllib.request
import requests

headers = {'Authorization': 'Basic $BASE64_ENCODED(026b77b5e5bc57d6828f77e0d7264181:dbc7c510b2fa7e304dc5cccbb8b97768)'}
url = 'https://api.intrinio.com/data_point?ticker=AAPL&item=close_price'
x=requests.get(url, auth=('026b77b5e5bc57d6828f77e0d7264181','dbc7c510b2fa7e304dc5cccbb8b97768')).content
print(x)
print(type(x))
print(dir(x))










def comp_ey(ebit,enterprise_value):
	return ebit/enterprise_value

def comp_roc(ebit, working_capital, nfa):
	return ebit/(working_capital+nfa)