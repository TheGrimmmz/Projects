from flask import Flask, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def reroute():
    return redirect('/install')


@app.route('/install')
def install():
    db.create_all()
    return redirect ("/home")


@app.route('/home')
def home():
    """Home page, show list of pets"""
    pets = Pet.query.all()
    return render_template('home.html', pets=pets)


@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """Renders add pet form"""

    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        return redirect('/home')
    else:
        return render_template("add.html", form=form)


@app.route('/edit/<int:pet_id>', methods=["GET", "POST"])
def edit_pet(pet_id):
    """Renders edit pet form"""
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        return redirect('/')
    else:
        return render_template('edit.html', pet=pet, form=form)

@app.route('/edit/<int:pet_id>/delete', methods=["POSTS"])
def delete(pet_id):
    """Delete Pet"""

    pet = Pet.query.get_or_404(pet_id)
    db.session.delete(pet)
    db.session.commit()

    return redirect('/home')
