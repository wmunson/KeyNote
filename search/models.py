from flask import Flask
from flask_sqlalchemy import SQLAlchemy 


app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///algo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)



class Company(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	company_name = db.Column(db.String(50))
	industry = db.Column(db.String(50))
	ebit = db.Column(db.Float)
	market_cap = db.Column(db.Float)
	total_cash = db.Column(db.Float)
	lt_debt = db.Column(db.Float)
	enterprise_value = db.Column(db.Float)
	current_assets = db.Column(db.Float)
	current_liabilities = db.Column(db.Float)
	working_capital = db.Column(db.Float)
	total_assets = db.Column(db.Float)
	intangible_assets = db.Column(db.Float)
	goodwill = db.Column(db.Float)
	nfa = db.Column(db.Float)
	earnings_yield = db.Column(db.Float)
	return_on_cap = db.Column(db.Float)

	def __init__(self, company_name, industry, ebit, market_cap, total_cash, lt_debt, enterprise_value, current_assets, current_liabilities, working_capital, total_assets, intangible_assets, goodwill, nfa, earnings_yield,return_on_cap):
		self.company_name = company_name
		self.industry = industry
		self.ebit = ebit
		self.market_cap = market_cap
		self.total_cash = total_cash
		self.lt_debt = lt_debt
		self.enterprise_value = enterprise_value
		self.current_assets = current_assets
		self.current_liabilities = current_liabilities
		self.working_capital = working_capital
		self.total_assets = total_assets
		self. intangible_assets = intangible_assets
		self.goodwill = goodwill
		self.nfa = nfa
		self.earnings_yield = earnings_yield
		self. return_on_cap= return_on_cap

db.drop_all()
db.create_all()