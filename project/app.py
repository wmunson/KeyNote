from flask import Flask, render_template, request, session, Blueprint
from flask_sqlalchemy import SQLAlchemy 
from config import DevConfig
import os
from extensions import db
from routes import account
from create_db import database_schema, database_seed

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
	db = SQLAlchemy(app)
	# database_schema(db)
	# print(db)
	# database_seed(db)
	app.run(debug=True)




