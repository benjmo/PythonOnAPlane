from flask import Flask, request, render_template, jsonify, redirect, url_for
from values import customers, services, drinks, snacks, other
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

#product name
#customer name
#row number
#seat 
@app.route('/get_orders', methods=['GET'])
def get_orders():
    ret = []
    for order in services:
        p_id = int(order['product_id'])
        p_type = order['product_type']
        c_id = int(order['customer_id'])
        if p_type == 'drinks':
            p_name = drinks[p_id]['name']
        elif p_type == 'snacks':
            p_name = snacks[p_id]['name']
        elif p_type == 'other':
            p_name = other[p_id]['name']
        ret.append({'customer_name' : customers[c_id]['name'],
                    'row_number' : customers[c_id]['row_number'],
                    'seat_letter' : customers[c_id]['seat_letter'],
                    'product_name' : p_name
        })
    return jsonify(ret)

@app.route('/get_products', methods=['GET'])
def get_products():
    return jsonify(drinks+snacks+other)

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

# params: product-type - [drinks/snacks/other]
#         product-id integer
@app.route('/get_product_by_id', methods=['GET'])
def get_product_by_id():
    if 'product-id' in request.args and 'product-type' in request.args:
        p_id = request.args.get('product-id')
        p_type = request.args.get('product-type')
        try:
            if p_type == 'drinks':
                return jsonify(drinks[int(p_id)])
            elif p_type == 'snacks':
                return jsonify(snacks[int(p_id)])
            elif p_type == 'other':
                return jsonify(other[int(p_id)])
            else:
                return jsonify({'error' : 'product type doesn\'t exist'})
        except IndexError:
            return jsonify({'error' : 'product id not exist'})
    else:
        return jsonify({'error' : 'please give product-id and product-type'})

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
#         product-type [drinks/snacks/other]
@app.route('/add_order', methods=['GET'])
def add_order():
    if 'product-id' in request.args and 'customer-id' in request.args and 'product-type' in request.args:
        p_id = request.args.get('product-id')
        u_id = request.args.get('customer-id')
        p_type = request.args.get('product-type')
        if p_type == 'drinks' or p_type == 'snacks' or p_type == 'other':
            services.append({
                'product_id' : p_id,
                'product_type' : p_type,
                'customer_id' : u_id
            })
            return jsonify({'response': 'order added'})
        else:
            return jsonify({'response' : 'use a valid product type'})
    else:
        return jsonify({'response': 'some issue with input. make sure include'
                        + 'variables product-id and customer-id'})

# params: product-id, customer-id
#         product-type [drinks/snacks/other]
@app.route('/remove_order', methods=['GET'])
def remove_order():
    if 'product-id' in request.args and 'customer-id' in request.args and 'product-type' in request.args:
        p_id = request.args.get('product-id')
        u_id = request.args.get('customer-id')
        p_type = request.args.get('product-type')
        index = -1
        for order in services:
            if order['product_id'] == p_id and order['product_type'] == p_type and order['customer_id'] == u_id:
                index = services.index(order)
                break
        if index != -1:
            print services, index
            print services.pop(index)
            print services, index
            return jsonify({'response': 'order removed'})
        else:
            return jsonify({'response' : 'FAILURE order not removed'})
    else:
        return jsonify({'response': 'some issue with input. make sure include'
                        + 'variables product-id and customer-id'})

if __name__ == '__main__':
    app.run(debug=True)
