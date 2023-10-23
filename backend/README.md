## Prerequisites

Before getting started, ensure you have the following installed on your system:

- [Python](https://www.python.org/downloads/)
- [Pipenv](https://pipenv.pypa.io/en/latest/)
- [Postgresql](https://www.postgresql.org/download/)

## Instructions

**Note**: These are instructions to set up the backend of this application.

1. After cloning the repository, navigate to the `backend` folder and initialize your virtual environment by typing `pipenv shell` on your command line.

You might need to specify the Python version you have installed on your computer by:
```
python --version (get the version of your installed Python)
pipenv --python x.x.xx (replace x with your version)
```

2. Set the env variables: Use the template from `dev.env` file and create your local `.env` file within the `backend` folder (same level as the `settings.py` file). Update the variables to match your local PostgreSQL credentials:

``````
DATABASE_NAME= # name of your local db
DATABASE_USER= # name of your postgres user
DATABASE_PASSWORD = # password that pgadmin asks you to create when you create your local db
``````

3. Install the dependencies listed in our Pipfile by typing:

```
pipenv install
```

4. Migrate models by running:

```
python manage.py migrate
```


4. We have created a management command script to seed data from a [public API](https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json). Run this seed command by typing:

```
python manage.py seed_food_data
```

**Note** Some iterations will fail due to inconsistency in the public API JSON data.

5. Create a superuser in by typing:
```
python manage.py createsuperuser
```
Follow the commands in your terminal. This will create a superuser in Django which gives you access to the backend admin site.

6. Run the server by typing:
```
python manage.py runserver
```

Navigate to `http://127.0.0.1:8000/admin`. Use the credentials you entered to create a superuser in order to access the admin site. 

At this point, you should be all set on the backend!
