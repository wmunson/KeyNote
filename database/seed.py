from create_db import *

import app

db = app.db



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
	'AAPL':[80, 0.4]

}



etf_example = ETF(
			'Techie',
			'Technology minded stocks with the big boys!'
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