from flask import Flask, render_template, session, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
# from app import *
from flask_bcrypt import Bcrypt
from create_db import User, Reference, ETF


account = Blueprint('account',__name__)



def session_set(user):
		session['user_id'] = user.id
		session['username'] = user.username
		session['password'] = user.password
		session['email'] = user.email
		session['user_created'] = user.date_created



def login_check(username,prov_password):
	user = User.query.filter_by(username=username).first()
	# Check if the password given is the password in the DB
	if bcrypt.check_password_hash(user.password,password):
		session['logged_in'] = True
		session_set(user)
		etfs = grab_etfs(user)
		return render_template('base.html',
						username=session['username'],
						etfs = etfs)
	else:
		return render_template('base.html',
				login_error_message="Sorry, the information you provided is incorrect. Please try again."
				)

def grab_etfs(user):
	key = user.id
	if user.id == None:
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

def etf_to_JSON(etf):
	etf_dict={
			'id': etf.id,
			'ETF_name': etf.ETf_name,
			'ETF_descr': etf.ETF_descr,
			'ETF_comp': etf.ETF_comp,
			'last_price': etf.last_price,
			'creation_date': etf.creation_date
	}
	return jsonify(etf_dict)




# ROUTES



@account.route('/',methods=['GET'])
def homepage():
	return render_template('base.html')


@account.route('/login',methods=['GET','POST'])
def authentication():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		login_check(username,password)
	else:
		return render_template('base.html')

@account.route('/register', methods=['GET','POST'])
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

@account.route('/example')
def display_example():
	example_etf = grab_etf(1)
	return render_template('example.html',
						example_etf = example_etf)
	# ADD ANYTHING ELSE?











