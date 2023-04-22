from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.blueprints.api import api
app.register_blueprint(api)



@app.route('/')
def index():
    return render_template('index.html')