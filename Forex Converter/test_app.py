from unittest import TestCase
from app import app

class FlaskTests(TestCase):
    def setUp(self):
        self.app = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_conversion(self):
            response = self.app.post('/convert', data={'amount': '1', 'currency_from': 'USD', 'currency_to': 'USD'})
            html = response.get_data(as_text=True)
            self.assertEqual(response.status_code, 200)
            self.assertIn('<p>The result from $1 is $1.00</p>', html)
