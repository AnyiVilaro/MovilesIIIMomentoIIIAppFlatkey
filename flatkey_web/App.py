from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
import requests
import json
import re

app = Flask(__name__)

# settings
app.secret_key = "mysecretkey"

@app.route("/")
def Index():
    return render_template('login.html')

@app.route("/login", methods=['POST'])
def Login():    
    if request.method == 'POST':
        email = request.form['email']
        if not re.match(r"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$", email):
            flash('Email should be valid.', category="error")
            return redirect(url_for('Index'))
        password = request.form['password']
        payload = {'email': email, 'password': password}
        try:
            response = requests.post('http://192.168.0.7:3000/api/user/validate', data=payload)
            json = response.json()
            if response.status_code == 200:
                print(json["res"]["data"][0]["user"])
                if "isowner" in json["res"]["data"][0]["user"]:
                    is_owner = json["res"]["data"][0]["user"]["isowner"]
                else:
                    is_owner = False
                

                email = json["res"]["data"][0]["user"]["email"]
                flash('Successfully authenticated', category="message")
                return redirect(url_for('List', email = email, isowner = is_owner))
            else:
                #message = json["res"]["error"]["message"]
                flash('Authentication error', category="error")
                return redirect(url_for('Index'))

        except Exception as err:
            print("Communication error : " + format(err))

@app.route("/user/<email>", methods=['GET'])
def RedirectUser(email=None):
    payload = {'email': email}
    response = requests.post('http://192.168.0.7:3000/api/user/get', data=payload)
    json = response.json()
    if response.status_code == 200:
        isowner = json["res"]["data"][0]["user"]["isowner"]
        return redirect(url_for('List', email = email, isowner = isowner))
    else:
        return redirect(url_for('Index'))


@app.route("/list/<email>/<isowner>", defaults={'properties_sorted': None}, methods=['GET'])
@app.route("/list/<email>/<isowner>/<properties_sorted>", methods=['GET'])
def List(email=None, isowner=None, properties_sorted=None):
    if isowner == "False" or isowner == None :
        if properties_sorted == "False" or properties_sorted == None:
            endpoint = 'list'
        else: 
            endpoint = 'listSorted'
    else:
        if properties_sorted == "True" :
            endpoint = 'listSortedByUser?email='+email
        else:
            endpoint = 'listByUser?email='+email

    print(endpoint)

    response = requests.get('http://192.168.0.7:3000/api/property/'+endpoint)
    json = response.json()
    if response.status_code == 200:
        data = json["res"]["data"][0]
        return render_template('list.html', properties = data, isowner=isowner) 
    else:
        return render_template('list.html', properties = [], isowner=isowner) 

@app.route("/list-all", methods=['GET'])
def ListAll():
    properties_sorted = request.args.get('sort')
    if properties_sorted == "True" :
        endpoint = 'listSorted'
    else: 
        endpoint = 'list'
    
    #If user is a guest
    response = requests.get('http://192.168.0.7:3000/api/property/'+endpoint)
    json = response.json()
    if response.status_code == 200:
        data = json["res"]["data"][0]
        return render_template('list.html', properties = data, isowner=False) 
    else:
        return render_template('list.html', properties = [], isowner=False) 

@app.route("/signup")
def SignUp():
    return render_template('signup.html')

@app.route("/createuser", methods=['POST'])
def CreateUser():
    if request.method == 'POST':
        name = request.form['name']
        lastname = request.form['lastname']
        email = request.form['email']
        if not re.match(r"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$", email):
            flash('Email should be valid.', category="error")
            return redirect(url_for('SignUp'))
        password = request.form['password']
        isowner = "false"
        if request.form.get("isowner"):
            isowner = "true"
        payload = {'name': name, 'lastname': lastname, 'email': email, 'password': password, 'isowner': isowner}
        try:
            response = requests.post('http://192.168.0.7:3000/api/user/add', data=payload)
            if response.status_code == 200:
                flash('User was created successfully', category="message")
                return redirect(url_for('SignUp', success="true"))
            else:
                flash('There was an error.', category="error")
                return redirect(url_for('SignUp', success="false"))

        except Exception as err:
            flash("Communication error : " + format(err))
            print("Communication error : " + format(err))

@app.route('/delete-property/<id>/<email>/<isowner>', methods = ['GET'])
def DeleteProperty(id, email, isowner):
    response = requests.delete('http://192.168.0.7:3000/api/property/delete/'+id)
    if response.status_code == 200:
        flash('Property Removed Successfully')
        return redirect(url_for('List', email = email, isowner = isowner))
    else:
        flash('There was an error: Property was not Removed')
        return redirect(url_for('List', email = email, isowner = isowner))


@app.route("/details", methods=['GET'])
def Details():
        #Obtener como query params - args
        title = request.args.get('title')
        _type = request.args.get('_type')
        rooms = request.args.get('rooms')
        price = request.args.get('price')
        area = request.args.get('area')
        address = request.args.get('address')
       
        return render_template('details.html', title=title, _type=_type, address=address, rooms=rooms, price=price, area=area)

@app.route("/create-property/<email>", methods=['POST', 'GET'])
def CreateProperty(email):
    if request.method == 'POST':
        title = request.form['title']
        _type = request.form['type']
        address = request.form['address']
        rooms = request.form['rooms']
        price = request.form['price']
        area = request.form['area']
        email = request.form['email']
        payload = {'title': title, 'type': _type, 'address': address, 'rooms': rooms, 'price': price, 'area': area, 'landlord': email}
        try:
            response = requests.post('http://192.168.0.7:3000/api/property/add', data=payload)
            if response.status_code == 200:
                flash('Property was created successfully', category="message")
                return redirect(url_for('List', email = email, isowner = True))
            else:
                flash('There was an error. Property could not be created.', category="error")
                return redirect(url_for('List', email = email, isowner = True))

        except Exception as err:
            flash("Communication error : " + format(err))
            print("Communication error : " + format(err))
    else:
        return render_template('create-property.html')

@app.route('/update/<id>', methods = ['POST', 'GET'])
def get_property(id):
    payload = {'id': id}
    response = requests.post('http://192.168.0.7:3000/api/property/get', data=payload)
    json = response.json()
    if response.status_code == 200:
        data = json["res"]["data"][0]["item"]
        return render_template('update-property.html', id=id, property = data)

@app.route('/update-property/<id>', methods=['POST'])
def update_property(id):
    if request.method == 'POST':
        title = request.form['title']
        _type = request.form['type']
        address = request.form['address']
        rooms = request.form['rooms']
        price = request.form['price']
        area = request.form['area']
        email = request.form['email']
        payload = {'title': title, 'type': _type, 'address': address, 'rooms': rooms, 'price': price, 'area': area, 'landlord': email}
        response = requests.put('http://192.168.0.7:3000/api/property/update/'+id, data=payload)
        if response.status_code == 200:
            flash('Property Updated Successfully')
            return redirect(url_for('RedirectUser', email = email))
        

if __name__ == "__main__":
    app.run(port = 5000, debug = True)