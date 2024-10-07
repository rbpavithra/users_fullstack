from flask import Flask, request, jsonify
import pymysql
from User import UserNew
import config
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Database connection
def get_db_connection():
    conn = pymysql.connect(
        host=config.MYSQL_HOST,
        user=config.MYSQL_USER,
        password=config.MYSQL_PASSWORD,
        database=config.MYSQL_DB,
        cursorclass=pymysql.cursors.DictCursor
    )
    return conn

@app.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Users (Name, Email, Pw) VALUES (%s, %s, %s)",
                   (data['name'], data['email'], data['pw']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Product created successfully'}), 201

'''
@app.route('/signup', methods=['GET'])
def list_user():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Users")
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(products)
'''

@app.route('/login/<string:email>/<int:pw>', methods=['GET'])
def get_user(email,pw):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE Email = %s and Pw= %s", (email,pw))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        return jsonify({"message":"user found"})
    else:
        return jsonify({'message': 'User not found'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)