import mysql.connector

# Paramètres de connexion
config = {
    'user': 'Bryan',
    'password': 'Basketball2.0',
    'host': 'localhost',
    'database': 'ziknet'
}

# Établir la connexion
connexion = mysql.connector.connect(**config)

if connexion.is_connected():
    print("Connexion successful")
else:
    print("Connexion failed")


from flask import Flask, request

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    first_name = request.form['firstname']
    last_name = request.form['lastname']
    email = request.form['email']
    password = request.form['password']
    # Traitez ces données (insérez-les dans la base de données, etc.)
    return "Captured data : {} - {} - {}".format(first_name, last_name, email, password)

if __name__ == '__main__':
    app.run()
