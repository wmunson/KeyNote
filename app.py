from flask import Flask, render_template, request, session, jsonify
from config import DevConfig
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from create_db import *
import requests
from tools import grab_articles, session_set, make_stock_list, etf_to_JSON, etf_pricer_final, user_to_JSON, etf_comp_into_array
import json
import time

app= Flask(__name__)

app.config.from_object("config.DevConfig")

app.secret_key = "secret"

# app.register_blueprint(account)

db = SQLAlchemy(app)

bcrypt = Bcrypt(app)




def get_author(etf):
	user = User.query.filter_by(id = etf.ETF_author).first()
	return user.username


def login_check(username,prov_password):
	print(username)
	user = User.query.filter_by(username=username).first()
	# Check if the password given is the password in the DB
	if bcrypt.check_password_hash(user.password,prov_password):
		session_set(user)
		etfs = grab_etfs(user.id)
		print('we got etfs')
		return etfs
	else:
		return False

def grab_etfs(user_id):
	key = user_id
	if type(user_id) is not int:
		pass
	else:
		etf_ids = Reference.query.filter_by(u_id=key).all()
		etf_id_list = []
		for reference in etf_ids:
			etf_id_list.append(reference.etf_id)
		etf_obj_list = []
		for etf_id in etf_id_list:
			etf_obj_list.append(ETF.query.filter_by(id=etf_id).first())
		return etf_obj_list


def grab_etf(key):
	etf = ETF.query.filter_by(id=key).first()
	if etf:
		# ready_etf = etf_to_JSON(etf)
		return etf
	else:
		return False


def recent_etf_price(etf_name):
	etf = ETF.query.filter_by(ETF_name = etf_name).first()
	etf_dict = etf.ETF_comp
	for key, value in etf_dict.items():
		time.sleep(3)
		url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol='+key
		result = request.get(url).json()





# ROUTES



@app.route('/',methods=['GET'])
def homepage():
	session.clear()
	return render_template('login.html')


@app.route('/login',methods=['GET','POST'])
def authentication():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		etfs = login_check(username,password)
		session_set(User.query.filter_by(username=username).first())
		if etfs == False:
			return render_template('login.html',
				errorMessage="Sorry, your login credentials were incorrect.")
		else:
			news = grab_articles()
			return render_template("home.html",
				first_name = session['first_name'],
				etfs = etfs,
				news_articles = news)
	else:
		if session['logged-in'] == True:
			etfs = grab_etfs(session['user_id'])
			return render_template("home.html",
			first_name = session['first_name'],
			etfs = etfs,
			news_articles = grab_articles())
		else:
			return render_template('login.html')

@app.route('/pie/<etf_name>')
def return_pie_material():
	pass

@app.route('/register', methods=['GET','POST'])
def create_account():
	if request.method == 'GET':
		return render_template('login.html')
	else:
		session.clear()
		new_username = request.form['usernameSignUp']
		check = User.query.filter_by(username = new_username).first()
		if check == None:
			# GRAB FORM DATA
			new_password = request.form['passwordSignUp']
			first_name = request.form['firstname']
			last_name = request.form['lastname']
			email = request.form['email']
			# GENERATE HASH PASSWORD
			hash_password = bcrypt.generate_password_hash(new_password)
			# BUILD NEW USER INSTANCE
			new_user = User(new_username, hash_password, first_name,last_name, email)
			db.session.add(new_user)
			db.session.commit()
			print(User.query.filter_by(username=new_user.username).first())
			return render_template('login.html',
					errorMessage="Creation Successful. Give it a try!")

		else:
			return render_template('login.html',
								errorMessage='Sorry the username you have provided is already taken')

@app.route("/etf/<etf_name>", methods=['GET', 'POST'])
def return_etf(etf_name):
	if request.method == 'GET':
		etf = ETF.query.filter_by(ETF_name = etf_name).first()
		print(etf.ETF_author)		
		# print(session['user_id'])
		check = get_author(etf)
		if session['username'] == check:
			return render_template('singleTheme.html',
							ETF_name = etf.ETF_name,
							date = str(etf.creation_date),
							author = check,
							ETF_descr = etf.ETF_descr,
							etf_pickle= etf_comp_into_array(etf.ETF_comp),
							not_owner = "not owner"
							)
		else:
			return render_template('singleTheme.html',
							ETF_name = etf.ETF_name,
							date = str(etf.creation_date),
							author = etf.ETF_author,
							ETF_descr = etf.ETF_descr,
							etf_pickle= etf_comp_into_array(etf.ETF_comp)
							)
	if request.method == 'POST':
		client_stuff = json.loads(request.form['data'])
		print(client_stuff)
		name = client_stuff['Name']
		description = client_stuff['Description']
		etf_array = client_stuff['etf']
		composition = {}
		full_value = 0
		for etf in etf_array:
			full_value += int(etf[1])
		for etf in etf_array:
			composition[etf[0]] = [etf[2], int(etf[1])/full_value]
		last_price = price_etf(composition)
		author = session['username']
		new_etf = ETF(name, session['user_id'], description, composition, last_price, last_price)
		db.session.add(new_etf)
		db.session.commit()
		etf = ETF.query.filter_by(ETF_name = name).first()
		new_ref = Reference(session['user_id'],etf.id)
		db.session.add(new_ref)
		db.session.commit()
		print(etf.ETF_name)
		if etf:
			return render_template('singleTheme.html', 
								ETF_name = etf.ETF_name,
								date = str(etf.creation_date),
								author = author,
								ETF_descr = etf.ETF_descr,
								etf_pickle= etf_comp_into_array(etf.ETF_comp)
								)
		else:
			return render_template('build.html')
	else:
		print('Huston we have a problem...')



@app.route('/example')
def display_example():
	example_etf = grab_etf(1)
	return render_template('build.html',
				example_etf = example_etf)
	# ADD ANYTHING ELSE?

@app.route('/explore', methods=['GET'])
def explore_ETFs_page():
	etfs = ETF.query.all()
	return render_template('explore.html',
			etfs = etfs)



@app.route('/save/<etf_name>')
def save_to_profile(etf_name):
	etf = ETF.query.filter_by(ETF_name=etf_name).first()
	new_ref = Reference(session['user_id'],etf.id)
	db.session.add(new_ref)
	db.session.commit()
	news = grab_articles()
	etfs = grab_etfs(session['user_id'])
	return render_template('home.html',
				first_name = session['first_name'],
				etfs = etfs,
				news_articles = news)

@app.route('/sample', methods=['GET'])
def explore_sample():
	session.clear()
	etf =ETF.query.first()
	return render_template('singleTheme.html',
					ETF_name = etf.ETF_name,
					date = str(etf.creation_date),
					author = "KeyNote Staff",
					ETF_descr = etf.ETF_descr
					)


@app.route('/build')
def show_build_page():
	return render_template('build.html')

@app.route('/customize/<key>')
def grab_the_ETF():
	chosen_etf = ETF.query.filter_by(id=key).first()
	return render_template('build.html',
			etf = chosen_etf)

@app.route('/logout')
def log_out():
	session.clear()
	print(session['username'])
	return render_template('login.html')

@app.route("/graph/<etf_name>")
def example(etf_name):
	etf = ETF.query.filter_by(ETF_name = etf_name).first()
	return etf_pricer_final(etf)

@app.route("/manage")
def return_user_info():
	user = User.query.filter_by(id=session['user_id']).first()
	final_product = user_to_JSON(user)
	return final_product



@app.route('/account', methods=['POST'])
def update_account():
	if request.method == 'POST':
		new_username = request.form['username']
		email = request.form['email']
		first_name = request.form['firstName']
		last_name = request.form['lastName']
		user1 = User.query.filter_by(id=session['user_id']).first()
		user1.first_name =first_name
		user1.last_name = last_name
		user1.email = email
		user1.username = new_username
		db.session.commit()
		return render_template('login.html',	
			errorMessage = "Try logging in to verify changes")
	else:
		pass


@app.route('/search', methods=['GET','POST'])
def search():
	search =  request.form['search_bar']
	etf_results = ETF.query.filter_by(ETF_name = search).all()
	etf_obj_list = []
	for etf_result in etf_results:
		etf_obj_list.append(etf_to_JSON(etf_result))
	etf_dict = {
			'results': etf_obj_list
	}
	return json.dumps(etf_dict)
	# return render_template('search.html',
	# 		etfs = etf_results)

@app.route('/stock/<string>', methods=['GET'])
def grab_stock_list(string):
	if type(string) != str:
		pass
	else:
		input_url = "http://dev.markitondemand.com/Api/v2/Lookup/json?input=" + string
		stock_list = requests.get(input_url).json()
		final_product = []
		for stock_obj in stock_list:
			if stock_obj['Name'] and stock_obj['Name'] != ' ':
				print(stock_obj)
				print(stock_obj['Name'])
				print(type(stock_obj['Name']))
				final_product.append(stock_obj)
			else:
				pass
		return json.dumps({'result' :final_product})

@app.route('/stock/more/<ticker>', methods=['GET'])
def grab_stock_info(ticker):
	if type(ticker) != str:
		pass
	else:
		input_url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + ticker.upper()
		stock_info = requests.get(input_url).json()
		if stock_info['Status'] == "SUCCESS":
			return json.dumps(stock_info)
		else:
			return json.dumps({'Symbol': stock_info['Symbol'],
				'void': "Sorry the information is not available."})

@app.route('/overview/<etf_name>', methods=['GET'])
def grab_composition(etf_name):
    etf = ETF.query.filter_by(ETF_name = etf_name).first()
    return json.dumps(etf.ETF_comp)


if __name__ == "__main__":
	app.run(debug=True)

{
  "Status": "Failure|APP_SPECIFIC_ERROR",
  "Name": "CBOE Apple VIX Index",
  "Symbol": "VXAPL",
  "LastPrice": "Not Available",
  "Change": "Not Available",
  "ChangePercent": "Not Available",
  "Timestamp": "Not Available",
  "MSDate": "Not Available",
  "MarketCap": "Not Available",
  "Volume": "Not Available",
  "ChangeYTD": "Not Available",
  "ChangePercentYTD": "Not Available",
  "High": "Not Available",
  "Low": "Not Available",
  "Open": "Not Available"
}


