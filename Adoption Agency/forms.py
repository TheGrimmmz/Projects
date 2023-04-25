from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, SelectField, TextAreaField
from wtforms.validators import InputRequired, Optional, URL, NumberRange, Length


class AddPetForm(FlaskForm):
    name = StringField("Pet Name", validators=[InputRequired(message='Name cannot be blank')])
    species = SelectField("Species", choices=[('dog', 'Dog'), ('cat', 'Cat'),('porcupine', 'Porcupine'), ('horse', "Horse"), ('goat', "Goat")])
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes", validators=[Optional(), Length(min=10)])


class EditPetForm(FlaskForm):
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField("Notes", validators=[Optional(), Length(min=10)])
    available = BooleanField("Available?")
