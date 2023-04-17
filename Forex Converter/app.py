from flask import Flask, render_template, request
from babel import Locale
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    amount = request.form['amount']
    currency_from = request.form['currency_from']
    currency_to = request.form['currency_to']
    currency_symbols = {
        'USD': Locale('en_US').currency_symbols['USD'],
        'EUR': Locale('de_DE').currency_symbols['EUR'],
        'GBP': Locale('en_GB').currency_symbols['GBP'],
        'JPY': Locale('ja_JP').currency_symbols['JPY']
        }

    url = f"https://api.exchangerate.host/convert?from={currency_from}&to={currency_to}&amount={amount}"
    response = requests.get(url)
    data = response.json()
    result = data['result']
    rounded = '{:.2f}'.format(round(result, 2))

    return render_template('result.html', amount=amount, currency_from=currency_from, currency_to=currency_to, result=rounded, currency_symbols=currency_symbols)
