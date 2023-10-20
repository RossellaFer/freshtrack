## Prerequisites

Before getting started, ensure you have the following installed on your system:

- [Python](https://www.python.org/downloads/)
- [Pipenv](https://pipenv.pypa.io/en/latest/)
- [Postgresql] (https://www.postgresql.org/download/)

## Instructions
Initialize virtual environment by typing `pipenv shell`.
Once the virtual environment is created, install dependencies using `pipenv install`

Verify that server is running by typing `python manage.py runserver`

Set the env variables:
Use the template from `dev.env` file and create your local `env` file within the `backend` folder (where `dev.env` file is located).
Update the variables to your local Postgresql credentials:

DATABASE_NAME= # name of your local db
DATABASE_USER= # name of your postgres user
DATABASE_PASSWORD = # password that pgadmin asks you to create when you create your local db

Once the postgres is locally set up, run the initial migration for your database.

Once you are in your virtual environment (`pipenv shell`), run:
`python manage.py migrate`

This will create the default Django models, such as the `User` model. Check in pgAdmin that these tables are created within the local db you specified.
This will also create our `Food` and `FoodCategory` models.

Now, you can run the management command script to seed the initial `Food` and `FoodCategory` objects.
In order to do so, run:
`python manage.py seed_food_data`

Note: There will be a few failures due to duplicates and erroneous data in the public API. 

Navigate to `http://127.0.0.1:8000/api/food`to verify that the new `Food` list is displaying.