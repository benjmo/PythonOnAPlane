from flask import Flask, request, render_template, jsonify, redirect, url_for
app = Flask(__name__)

services = [
    {
        'product-id': 1234,
		'customer-id': 0
    },
    {
        'product-id': 5827,
		'customer-id': 1
    }
]

customers = [
	{
		'name' : 'Peter',
		'row_number': 32,
		'seat_letter' : 'f'
	},
	{
		'name' : 'Bob',
		'row_number': 43,
		'seat_letter' : 'b'
	}
]

@app.route('/')
@app.route('/index')
def boilerplate():
    return render_template('index.html')

@app.route('/crew')
def crew_view():
    return render_template('crew.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/get_services', methods=['GET'])
def get_services():
    return jsonify({'services': services})

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
        return jsonify({'response': 'some issue with input'})

if __name__ == '__main__':
    app.run(debug=True)
