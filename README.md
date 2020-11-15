# Introduction
Registration app is the backend api for registering new users.  New users are stored in a database, with passwords encrypted.  

## Additional information
The application has two containers, one for the postgres db and another for the api.  These can be run simultaneously using docker-compose.  Passwords are encrypted using bcrypt.  The database is initialized with sample user data.


## Usage

To run the application on your local machine, you will need to have docker and node installed.  Then:

```
$ npm install
$ docker-compose down -v && docker-compose up --build

```

If you want to run only the api, use the following command:
```
$ npm start
```


If you want to run the postgres db through the command line, use the following command:

```
$ docker run -it -p <port>:<port> -d <app_name>
$ docker exec -it postgresdb psql -U api_user -W registration_db
$ \dt to list all tables

