# Django_viteproject_bookapp

A small book catalog with a Django REST API and a React (Vite) front end. You can list books, add one (title and release year), change a title, and delete a book.

## Tech stack

- Django 5.1, Django REST Framework, django-cors-headers
- PostgreSQL
- React 18, React Router, Vite

There is no root `requirements.txt`; install the Python packages listed above in a virtualenv.

## API

Served under `/api/` on the Django dev server (port 8000):

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/books/` | List books |
| `POST` | `/api/books/create/` | Create a book (`title`, `release_year`) |
| `PUT` | `/api/books/<id>` | Update a book |
| `DELETE` | `/api/books/<id>` | Delete a book |

The Django admin is at `/admin/`. CORS is configured to allow all origins. The front end calls `http://127.0.0.1:8000` and is routed at `/book`.

## Run locally

### Database

PostgreSQL is configured in `server/bookproject/bookproject/settings.py` (`NAME`, `USER`, `PASSWORD`, `HOST`, `PORT`). Update those values for your local database, then:

```bash
cd server/bookproject
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers psycopg2-binary
python manage.py migrate
python manage.py runserver
```

### Front end

```bash
cd client/app
yarn install    # yarn.lock is in this folder
yarn dev
```

Open the path `/book` on the Vite dev server.

## Project structure

```
server/bookproject/          # Django project
  manage.py
  bookproject/settings.py
  api/                       # Book model, serializer, views, urls
client/app/                  # Vite + React app
  src/pages/book.jsx         # Book list and forms
```

Built by Clinton Nkamigbo · https://clinton-nkamigbo.vercel.app
