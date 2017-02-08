from flask import Flask
from config import DevConfig
from flask_sqlalchemy import SQLAlchemy
from create_db import *

app= Flask(__name__)

app.config.from_object("config.DevConfig")


db=SQLAlchemy(app) 







# if __name__ == "__main__":
# 	db.drop_all()
# 	db.create_all()
