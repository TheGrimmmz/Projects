### Conceptual Exercise

Answer the following questions below:

- **What are important differences between
Python and JavaScript?**
Javascript-client side, mainly front end development, can be rean within most web browsers
Python-server side, mainly back end development, need to be ran from terminal

- **Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you can try to get a missing key (like "c") *without* your programming crashing.**
dict.get('c', '3')
try-except

- **What is a unit test?**
small test written to test specific functions or small parts of code

- **What is an integration test?**
tests written to see how code segments work together

- **What is the role of web application framework, like Flask?**
to help write code smoother and make it easier to use and test

- **You can pass information to Flask either as a parameter in a route URL (like '/foods/pretzel') or using a URL query param (like 'foods?type=pretzel'). How might you choose which one is a better fit for an application?**
using a query param is mor for using a search base

- **How do you collect data from a URL placeholder parameter using Flask?**
request.args['placeholder']

- **How do you collect data from the query string using Flask?**
request.url

- **How do you collect data from the body of the request using Flask?**
request.args.get()

- **What is a cookie and what kinds of things are they commonly used for?**
a cookie is a small piece of data sent to the web browser, cookies help websites remember information about a visit to that webpage

- **What is the session object in Flask?**
a dictionary object that contains key-value pairs of the session variables

- **What does Flask's `jsonify()` do?**
returns a response object
