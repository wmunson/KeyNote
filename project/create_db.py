from datetime import datetime, date

def database_schema(db):
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
		ETF_descr = db.Column(db.String(200))
		ETF_comp = db.Column(db.PickleType)
		last_price = db.Column(db.Float)
		creation_date = db.Column(db.Date, default=date.today())
		ETF = db.relationship("Reference")

		def __init__(self,ETF_name, ETF_descr, ETF_comp, last_price):
			self.ETF_name = ETF_name
			self.ETF_descr = ETF_descr
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
	db.create_all()
	print("Database has been created!!")

def database_seed(db):
	from models import User, Reference, ETF
	admin = User(
				'admin',
				'admin',
				'Mister',
				'admin',
				'admin@bread.com'
	)


	# [quantity, weight]
	pickle = {
		'IBM':[100, 0.3],
		'MSFT':[40, 0.3],
		'AAPL':[80, 0.4]}



	etf_example = ETF(
				'Techie',
				"Technology minded stocks with the big boys!",
				pickle,
				35.00
	)

	ref = Reference(1,1)


	db.session.add(admin)

	db.session.add(etf_example)

	db.session.add(ref)

	db.session.commit()


	print("Database seeded!")

	query = ETF.query.filter_by(ETF_name = "Techie").first()

	print(query.ETF_comp)





		






