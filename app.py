from flask import Flask, request, render_template, jsonify, redirect, url_for
from values import customers, services, products
app = Flask(__name__)

@app.route('/')
@app.route('/index')
def boilerplate():
    return render_template('passenger.html')

@app.route('/crew')
def crew_view():
    return render_template('crew.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/get_services', methods=['GET'])
def get_services():
    return jsonify({'services': services})

@app.route('/get_products', methods=['GET'])
def get_products():
    return jsonify({'products': products})

# params: customer-id
@app.route('/get_customer', methods=['GET'])
def get_customer():
    if 'customer-id' in request.args:
        c_id = request.args.get('customer-id')
        try:
            return jsonify({'customer': customers[int(c_id)]})
        except IndexError:
            return jsonify({'error' : 'customer id not exist'})
    else:
        return jsonify({'error' : 'please give in integer variable customer-id'})

# params: product-id
@app.route('/get_product_by_id', methods=['GET'])
def get_product_by_id():
    if 'product-id' in request.args:
        p_id = request.args.get('product-id')
        try:
            return jsonify({'product': products[int(p_id)]})
        except IndexError:
            return jsonify({'error' : 'product id not exist'})
    else:
        return jsonify({'error' : 'please give in integer variable product-id'})

# params: row-number, seat-letter, customer-id
@app.route('/update_seat', methods=['GET'])
def update_seat():
    if 'row-number' in request.args and 'seat-letter' in request.args and 'customer-id' in request.args:
        row = request.args.get('row-number')
        seat = request.args.get('seat-letter')
        c_id = request.args.get('customer-id')
        try:
            customers[int(c_id)]['row_number'] = int(row)
            customers[int(c_id)]['seat_letter'] = seat
            return jsonify({'return': 'success'})
        except IndexError:
            return jsonify({'error' : 'customer id not exist'})
    else:
        return jsonify({'error' : 'please give valid row-number, seat-letter, '
                        + 'customer-id'})

# params: product-id, customer-id
@app.route('/add_order', methods=['GET'])
def add_order():
    if 'product-id' in request.args and 'customer-id' in request.args:
        p_id = request.args.get('product-id')
        u_id = request.args.get('customer-id')
        services.append({
                'product-id' : p_id,
                'customer-id' : u_id
            })
        return jsonify({'response': 'ok'})
    else:
        return jsonify({'response': 'some issue with input. make sure include'
                        + 'variables product-id and customer-id'})

if __name__ == '__main__':
    app.run(debug=True)
