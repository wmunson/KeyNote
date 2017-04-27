***Welcome to KeyNote - "Theme-based Investment Tracker"***

**About:**
With KeyNote you can create ETFs (Exchange-Traded Fund), or as we call them "Themes", based on different sectors and industries. Once you have created an account you can create as many Themes as you'd like and track their performace compared to the S&P 500.

We built this for the educational purpose of building a full stack web app that used a database, made calls to an API, and served multiple templates.
_______________________________________________________________________________________________________________________________

**Tehcnologies:**

-Server side - Python, Flask.
-Front end - HTML, CSS, JavaScript.
-Database - SQLite3, using SQLALchemy.

*A further breakdown of the packages used can be found in the requirements.txt

_______________________________________________________________________________________________________________________________

**Usage:**

To run the application you need to create a virtual environment, download/install requirements.txt, then run app.py

-app.py invokes the Flask app and the db ORM, it also contains the routes for the server.

-config.py hadles the configurations.

-constituents.csv was used to price the starting Themes that are seeded to test the validity of using Joel Greenblatt's Magic Formula.

-creat_db.py creates and seeds the db. *Note: This file is run everytime the app.py is run.*

-tools.py handles all the data manipulation and processing.

-Templates folder contains all HTML templates

-Static contains all CSS and JS files. Files are named by their corresponding. HTML file.
______________________________________________________________________________________________________________________________

**APIs:**

-Intrinio - Used for Greenblatt's Magic Formula.

-Markit - Provided stock information for searching and saving individual stock info.

-Yahoo Finance - Provided historical stock data for comparision of Themes to S&P 500.

-NewsAPI.org - Provided financial news aritcles.

______________________________________________________________________________________________________________________________

**Notes:**

-There is a bug with the sessions and a couple routes GET/POST abilities that can be found when navigating around using the back arrow.

-The db is reset each time the server is restarted, so past Themes will be lost when server is stoppped.

-Markit API is easily over used and will bottle-neck if stock searches are made too rapidly. 

