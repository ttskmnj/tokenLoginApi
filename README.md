This is a simple REST API which you can register user, login and acess user informations using JWT Token.

# Prerequisites
- docker-compose

# How to run

### 1. create `.env` file
Create `.env` file in root of this repository and fill following variables
```
MONGO_INITDB_ROOT_USERNAME=<MONGODB USER>
MONGO_INITDB_ROOT_PASSWORD=<MONGODB PASSWORD>
MONGO_INITDB_DATABASE=<MONGODB DATABASE>
MONGODB_URI=mongodb://<MONGODB USER>:<MONGODB PASSWORD>@mongo:27017/<MONGODB DATABASE>?authSource=admin
PORT=3000
JWT_SECRET=<JWJWT_SECRETT>
```
*\*if you already have used port `27017` or `3000` for other use, please change them in `.env` and also make sure it match in `docker-compose.yml` too*
### 2. Start containers
run following command from root of this repository
```
$ docker-compose up -d
[+] Building 0.0s (0/0)                                         docker:desktop-linux
[+] Running 3/3
 ✔ Network tokenloginapi_default  Created                                      0.0s 
 ✔ Container mongo                Started                                      0.0s 
 ✔ Container app                  Started                                      0.0s
```

check if all containers are up
```
$ docker ps
CONTAINER ID   IMAGE               COMMAND                  CREATED         STATUS         PORTS                      NAMES
c0aa6dca13a8   mongo:latest        "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes   0.0.0.0:27017->27017/tcp   mongo
790618be3e00   tokenloginapi-app   "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes   0.0.0.0:3000->3000/tcp     app
```

if you want to stop containers run following command
```
$ docker-compose down         
[+] Running 3/2
 ✔ Container mongo                Removed                                             0.1s 
 ✔ Container app                  Removed                                             10.2s 
 ✔ Network tokenloginapi_default  Removed                                             0.1s                                                                       
```

# How to try API

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
