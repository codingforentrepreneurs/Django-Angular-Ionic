# Ionic Django Integration Section

To get Django ready, be sure to do the following:

### Pull Django Backend
```
$ mkdir dev
$ cd dev
$ mkdir backend
$ cd backend
$ git clone https://github.com/codingforentrepreneurs/Django-Angular-Ionic/ .
$ git reset 65f74b19ea8e43a5b001a100a0fb151c8265892f --hard
$ rm -rf .git
$ pipenv install --python python3.6
$ pipenv install -r requirements.txt
$ pipenv install django-cors-headers
$ pipenv install coreapi
$ pipenv shell
$ cd src
$ python manage.py runserver
```

Missing [pipenv](https://www.youtube.com/watch?v=K2fNEoZfuy8)?
