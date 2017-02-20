from models import db, Company
import urllib.request
import requests


url = 'https://api.intrinio.com/tags/standardized?identifier=AAPL&statement=income_statement'
x=requests.get(url).content
print(x)
print(type(x))
print(dir(x))









def comp_ey(ebit,enterprise_value):
	return ebit/enterprise_value

def comp_roc(ebit, working_capital, nfa):
	return ebit/(working_capital+nfa)