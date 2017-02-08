from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime, date
import app

db = app.db

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
		self.password=password
		self.first_name = first_name
		self.last_name = last_name
		self.email = email

class ETF(db.Model):
	__tablename__ = 'etf'
	# Table Schema
	id = db.Column(db.Integer, primary_key=True)
	ETF_name = db.Column(db.String(40), unique=True)
	ETF_comp = db.Column(db.PickleType)
	last_price = db.Column(db.Float)
	ETF = db.relationship("Reference")

	def __init__(self,ETF_name, ETF_comp,last_price):
		self.ETF_name = ETF_name
		self.ETF_comp=ETF_comp
		self.last_price = last_price

class Reference(db.Model):
	# Table Schema
	id = db.Column(db.Integer, primary_key=True)
	u_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	etf_id = db.Column(db.Integer, db.ForeignKey('etf.id'), nullable=False)

	def __init__(self, u_id, etf_id):
		self.u_id = u_id
		self.etf_id = etf_id







db.drop_all()
db.create_all()

print("Database has been created!!")

	






