from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime, date
from app import db, bcrypt
from flask_bcrypt import Bcrypt
from tools import price_etf
import requests
import time




class User(db.Model):
	# Table Schema
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(40), unique=True)
	password = db.Column(db.String(200))
	first_name = db.Column(db.String(40))
	last_name = db.Column(db.String(40))
	email = db.Column(db.String(40))
	date_created = db.Column(db.Date, default=date.today)
	user = db.relationship("Reference")

	def __init__(self,username, password,first_name,last_name,email):
		self.username = username
		self.password = password
		self.first_name = first_name
		self.last_name = last_name
		self.email = email

class ETF(db.Model):
	__tablename__ = 'etf'
	# Table Schema
	id = db.Column(db.Integer, primary_key=True)
	ETF_name = db.Column(db.String(100), unique=True)
	ETF_author = db.Column(db.Integer)
	ETF_descr = db.Column(db.String(200))
	ETF_comp = db.Column(db.PickleType)
	original_price = db.Column(db.Float)
	last_price = db.Column(db.Float)
	creation_date = db.Column(db.Date, default=date.today())
	ETF = db.relationship("Reference")

	def __init__(self,ETF_name, ETF_author, ETF_descr, ETF_comp, original_price, last_price):
		self.ETF_name = ETF_name
		self.ETF_author = ETF_author
		self.ETF_descr = ETF_descr
		self.ETF_comp=ETF_comp
		self.original_price = original_price
		self.last_price = last_price


class Reference(db.Model):
	# Table Schema
	id = db.Column(db.Integer, primary_key=True)
	u_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	etf_id = db.Column(db.Integer, db.ForeignKey('etf.id'), nullable=False)

	def __init__(self, u_id, etf_id):
		self.u_id = u_id
		self.etf_id = etf_id



print("Database has been created!!")

db.drop_all()
db.create_all()



admin_password = bcrypt.generate_password_hash("admin")

admin = User(
			'admin',
			admin_password,
			'KeyNote Staff',
			'Boss',
			'admin@keynote.com'
)


def get_price(ticker):
	mc_url = "http://dev.markitondemand.com/Api/v2/Quote/json?symbol="+ticker
	result = requests.get(mc_url).json()
	return result['LastPrice']

# [quantity, weight]
pharma = {'UNH': [163.06, 0.2],
		  'GILD': [69.94, 0.2],
		  'DGX': [97.31, 0.2],
		  'ABBV': [62.09, 0.2],
		   'ABC': [92.16, 0.2]
    }
	



pharma_example = ETF(
			'Healthy',
			1,
			"Pharmaceutical Companies with a high return on capital and high yield should keep our pockets healthy!",
			pharma,
			price_etf(pharma),
			price_etf(pharma)
)



financials = {'PSA': [228.41, 0.2], 'HRB': [20.05, 0.2], 'HCP': [32.64, 0.2], 'AMT': [112.89, 0.2], 'ICE': [58.3, 0.2]}



financials_example = ETF(
			'Financials',
			1,
			"Using return on capital and high yield as metrics, Financials enjoys all the benefits of the financial industry from storage companies to REIT's.",
			pharma,
			price_etf(financials),
			price_etf(financials)
)


ref = Reference(1,1)
ref2 = Reference(1,2)


db.session.add(admin)

db.session.add(pharma_example)

db.session.add(financials_example)

db.session.add(ref)
db.session.add(ref2)

db.session.commit()


print("Database seeded!")


	






