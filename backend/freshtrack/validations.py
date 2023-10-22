from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Please choose another email.')

    if not password or len(password) < 8:
        raise ValidationError('Password is too short. Minimum of 8 characaters.')

    if not username:
        raise ValidationError('Username is required.')

    return data
