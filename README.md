This is a simple REST API which you can register user, login and acess user informations.

# How to run

### 1. Create `.env` file
create `.env` file and set following variables
```
POSTGRES_USER=<POSTGRES_USERNAME>
POSTGRES_PASSWORD=<POSTGRES_PASSWORD>
POSTGRES_DB=<POSTGRES_DATABASE>
POSTGRES_URI=postgres://<POSTGRES_USERNAME>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DATABASE>
PORT=3001
JWT_SECRET=<JWT_SECRET>
```

### 2. Run Mongo container
run following command
```
$ docker run-d --env-file .env -p 5432:5432 postgres
```

### 3. install node libraries
run following command at root directory of this repository.
```
$ npm install
```

### 4. start API
run following command at root directory of this repository.
```
$ npm start
```


# How to test

## Register user
### request
```
POST http://localhost:3001/auth/register
# header
{
  'Accept': 'application/json'
}

# body
{
    "name": "test",
    "email": "test@email.com",
    "password": "passwd",
    "street": "graf-ulrich strasse",
    "city": "emden",
    "state": "nieder sachsen"
}
```

### response
```
{
    "name": "test",
    "email": "test@email.com",
    "street": "graf-ulrich strasse",
    "city": "emden",
    "state": "nieder sachsen",
    "creation_date": "2022-04-10T17:55:54.128Z",
    "_id": "62531a2a3c62c5a61048e40b"
}
```


## Login with registered user
### request
```
POST http://localhost:3001/auth/login
# header
{
  'Accept': 'application/json'
}

# body
{
    "email": "test@email.com",
    "password": "passwd"
}
```

### response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inllc3RAZW1haWwuY29tIiwiaWQiOiI2MjUzMWEyYTNjNjJjNWE2MTA0OGU0MGIiLCJpYXQiOjE2NDk2MTMzOTN9.gT8ADEtz3SQ0lyxrGrZe_7epA-dSfeU_r4pkHlrpq0U",
    "user_id": "62531a2a3c62c5a61048e40b",
    "email": "test@email.com",
    "name": "test"
}
```

## Get all users list
### request
```
GET http://localhost:3001/user/
# header
{
  'Accept': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inllc3RAZW1haWwuY29tIiwiaWQiOiI2MjUzMWEyYTNjNjJjNWE2MTA0OGU0MGIiLCJpYXQiOjE2NDk2MTMzOTN9.gT8ADEtz3SQ0lyxrGrZe_7epA-dSfeU_r4pkHlrpq0U'
}
```
### response
```
[
    {
        "id": "62531a2a3c62c5a61048e40b",
        "name": "test"
    },
    {
        "id": "62531e5d3c62c5a61048e411",
        "name": "test1"
    }
]
```

## Get user detail
### request
```
GET http://localhost:3001/user/62531a2a3c62c5a61048e40b
# header
{
  'Accept': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inllc3RAZW1haWwuY29tIiwiaWQiOiI2MjUzMWEyYTNjNjJjNWE2MTA0OGU0MGIiLCJpYXQiOjE2NDk2MTMzOTN9.gT8ADEtz3SQ0lyxrGrZe_7epA-dSfeU_r4pkHlrpq0U'
}
```
### response
```
{
    "_id": "62531a2a3c62c5a61048e40b",
    "name": "test",
    "email": "test@email.com",
    "street": "graf-ulrich strasse",
    "city": "emden",
    "state": "nieder sachsen",
    "creation_date": "2022-04-10T17:55:54.128Z"
}
```

## Update user detail
### request
```
PUT http://localhost:3001/user
# header
{
  'Accept': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inllc3RAZW1haWwuY29tIiwiaWQiOiI2MjUzMWEyYTNjNjJjNWE2MTA0OGU0MGIiLCJpYXQiOjE2NDk2MTMzOTN9.gT8ADEtz3SQ0lyxrGrZe_7epA-dSfeU_r4pkHlrpq0U'
}
# body
{
    "city": "berlin"
}
```
### response
```
{
    "_id": "62531a2a3c62c5a61048e40b",
    "name": "test",
    "email": "test@email.com",
    "street": "graf-ulrich strasse",
    "city": "berlin",
    "state": "nieder sachsen",
    "creation_date": "2022-04-10T17:55:54.128Z"
}
```

## delete user
### request
```
DELETE http://localhost:3001/user
# header
{
  'Accept': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inllc3RAZW1haWwuY29tIiwiaWQiOiI2MjUzMWEyYTNjNjJjNWE2MTA0OGU0MGIiLCJpYXQiOjE2NDk2MTMzOTN9.gT8ADEtz3SQ0lyxrGrZe_7epA-dSfeU_r4pkHlrpq0U'
}
```
### response
```
{
    "msg": "successfully removed user"
}
```
