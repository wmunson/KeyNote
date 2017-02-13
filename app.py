from flask import Flask, render_template, request, session, Blueprint
from config import DevConfig
import os
from extensions import db



# app= Flask(__name__)

# app.config.from_object("config.DevConfig")



BLUEPRINTS = (
	account,

	)


def set_blueprints(app,blueprints):
	for blueprint in blueprints:
		app.register_blueprint(account)

def extensions_adder(app):
	db.init_app(app)	




def create_app(config=None, app_name='keynote', blueprints=None):
	app=Flask(app_name,
		static_folder=os.path.join(os.path.dirname(__file__), 'static'),
		template_folder="templates"
			)

	app.config.from_object("config.DevConfig")

	app.secret_key = "secret"

	if blueprints is None:
		blueprints = BLUEPRINTS

	else:
		print("Tom sucks")

	# SET BLUEPRINTS TO APP
	set_blueprints(app,blueprints)

	# SET EXTENSIONS TO APP
	extensions_adder(app)

	return app





if __name__ == "__main__":
	app = create_app()
	app.run(debug=True)






# def session_set(user):
# 		session['user_id'] = user.id
# 		session['username'] = user.username
# 		session['password'] = user.password
# 		session['email'] = user.email
# 		session['user_created'] = user.date_created



# def login_check(username,prov_password):
# 	user = User.query.filter_by(username=username).first()
# 	print(user.username)
# 	# Check if the password given is the password in the DB
# 	# if bcrypt.check_password_hash(user.password,password):
# 	if user.password == prov_password:
# 		session['logged_in'] = True
# 		session_set(user)
# 		etfs = grab_etfs(user)
# 		print("we made it here")
# 		return (user,etfs)
		
# 	else:
# 		return render_template('base.html',
# 				login_error_message="Sorry, the information you provided is incorrect. Please try again."
# 				)

# def grab_etfs(user):
# 	key = user.id
# 	if user.id == None:
# 		pass
# 	else:
# 		etf_ids = Reference.query.filter_by(u_id=key).all()
# 		etf_id_list = []
# 		for reference in etf_ids:
# 			etf_id_list.append(reference.etf_id)
# 		etf_obj_list = []
# 		for etf_id in etf_id_list:
# 			etf_obj_list.append(ETF.query.filter_by(id=etf_id).first())
# 		return etf_obj_list




# # ROUTES



# @app.route('/',methods=['GET'])
# def homepage():
# 	return render_template('base.html')


# @app.route('/login',methods=['POST'])
# def authentication():
# 	username = request.form['username']
# 	password = request.form['password']
# 	print(username)
# 	print(password)
# 	info = login_check(username,password)
# 	return render_template('base.html',
# 						username=session['username'],
# 						etfs = info[1])





