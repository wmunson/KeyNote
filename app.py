from flask import Flask, render_template, request, session, jsonify
from config import DevConfig
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from create_db import *
import requests
from tools import grab_articles, session_set, make_stock_list, etf_to_JSON


app= Flask(__name__)

app.config.from_object("config.DevConfig")

app.secret_key = "secret"

# app.register_blueprint(account)

db = SQLAlchemy(app)

bcrypt = Bcrypt(app)






def login_check(username,prov_password):
	user = User.query.filter_by(username=username).first()
	# Check if the password given is the password in the DB
	if bcrypt.check_password_hash(user.password,prov_password):
		session_set(user)
		etfs = grab_etfs(user.id)
		return etfs
	else:
		return render_template('base.html',
				login_error_message="Sorry, the information you provided is incorrect. Please try again."
				)

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






# ROUTES



@app.route('/',methods=['GET'])
def homepage():
	return render_template('login.html')


@app.route('/login',methods=['GET','POST'])
def authentication():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		etfs = login_check(username,password)
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
			etfs = etfs)
		else:
			return render_template('login.html')

@app.route('/register', methods=['GET','POST'])
def create_account():
	if request.method == 'GET':
		return render_template('create_acct.html')
	else:
		session.clear()
		new_username = request.form['username']
		check = User.query.filter_by(username = new_username).first()
		if check == None:
			# GRAB FORM DATA
			new_password = request.form['password']
			first_name = request.form['first_name']
			last_name = request.form['last_name']
			email = request.form['email']
			# GENERATE HASH PASSWORD
			hash_password = bcrypt.generate_hash_password(new_password)
			# BUILD NEW USER INSTANCE
			new_user = User(new_username, hash_password, first_name,last_name, email)
			db.session.add(new_user)
			db.session.commit()
			# GRAB THE USER OBJ (ID most importantly)
			user =  User.query.filter_by(username=new_user.new_username).first
			session_set(user)
			return render_template('home.html')

		else:
			return render_template('create_acct.hmtl',
								create_error_message='Sorry the username you have provided is already taken')

@app.route('/example')
def display_example():
	example_etf = grab_etf(1)
	return render_template('example.html',
				example_etf = example_etf)
	# ADD ANYTHING ELSE?

@app.route('/explore', methods=['GET'])
def explore_ETFs_page():
	etfs = etf.query.all()
	return render_template('explore.html',
			etfs = etfs)





if __name__ == "__main__":
	db.drop_all()
	db.create_all()
	app.run(debug=True)




