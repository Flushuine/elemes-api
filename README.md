# ELEMES BACKEND TEST API

## Table of Contents

1. [General Information](#general-information)
2. [Requirements](#requirements)
3. [Installation](#installation)
   - [Heroku](#heroku)
   - [Locally](#locally)
4. [API Documentation](#api-documentation)
   - [Authentication](#authentication)
   - [Course](#course)
   - [Course Image](#course-image)
   - [Course Category](#course-category)
   - [Admin Site](#admin-site)

<br>

## General Information

This is a project for Backend test in Elemes.id

## Requirements

Before we get started, make sure you have a server with:

- NPM 6.14.15 or newer installed.
- NodeJS 14.17.6 or newer installed.
- Git.
- MySQL Database.
- Redis Server.

Here's a tutorial on how to install [**Redis Server.**](https://redis.io/topics/quickstart)

## Installation

### Heroku

1. Clone and push this repository to heroku repository.
2. Build the repo.
3. Setup the config vars (.env) in `Heroku -> settings`. All the config example is in `.env.example`.
4. Open Heroku terminal, and run this:
   ```bash
   $ npm run init
   $ npm run migrate
   $ npm run seed
   ```

<br>

### Locally

Clone and extract this repository and then install it locally using this command:

```bash
$ cd ../elemesTest
$ npm install
$ cp .env.example .env
$ npm run init
```

1. Create a database.
2. Open .env file
3. Run `$ node ./utils/secret_key.js`
4. Copy key1 to `SECRET_KEY` and copy key2 to `REFRESH_KEY`
5. Inform your database in `.env` file.
6. Inform your database in `config/config.json` file.

After that, run this:

```bash
$ npm run migrate
$ npm run seed
```

To run this application just simply run:

```bash
$ npm start
```

**MAKE SURE THAT MYSQL AND REDIS SERVER IS RUNNING.**

<br>

## API Documentation

All API usage will be explained here.

Endpoint or section that has **ADMIN** mark can only be accessed with user with `Admin` role.

### Authentication

#### REGISTER

- Method: POST
- Endpoint: `api/auth/register`

This endpoint is used for user registration.

- Body:

  ```json
  {
    "fullName": "string",
    "email": "string",
    "password": "string",
    "password_confirmation": "string"
  }
  ```

- Response:

  ```json
  {
    "success": true,
    "message": "Registrasi sukses."
  }
  ```

<br>

#### LOGIN

- Method: POST
- Endpoint: `api/auth/login`

This endpoint is used for login.

- Body:

  ```json
  {
    "email": "string",
    "password": "string",
    "remember": boolean
  }
  ```

  if `remember` is true, the refresh token will last for 3 days, if false, the refresh token will last for 3 hours.

- Response:

  ```json
  {
    "accessToken": "random string access token"
  }
  ```

If login credential is valid, the server will return Access Token in JSON and put Refresh Token to HTTPOnly Cookies. Access Token will expire in 30 seconds, and if it expired, you need to get a new Access Token using Refresh Token in client's HTTPOnly Cookies. Refresh Token will expire in 3 days, and if it expired, you need to relogin.

<br>

#### REFRESH TOKEN

- Method: GET
- Endpoint: `api/auth/refresh-token`

When Access Token expired, you can generate a new Access Token from this endpoint. The server will check if the Refresh Token is exist in client's HTTPOnly Cookies, and if it's valid, you'll get a response with a new Access Token.

- Response:

  ```json
  {
    "accessToken": "random string access token"
  }
  ```

<br>

#### LOGOUT

- Method: DELETE
- Endpoint: `api/auth/logout`

This endpoint is used for logout. When you logout, the server will remove Refresh Token that stored in Redis Server and that token is no longer can be used.

<br>

### Course

#### STORE COURSE (ADMIN)

- Method: POST
- Endpoint: `api/course/store`

You can store a new course by using this endpoint.

- Header:

  - Content-Type: multipart/form-data
  - Authorization: Bearer Token

- Body:

  | Key               | Value   |
  | ----------------- | ------- |
  | courseName        | string  |
  | courseCategoryId  | integer |
  | courseDescription | text    |
  | coursePrice       | float   |
  | courseImage       | file    |

- Response:

  ```json
  {
    "success": true,
    "message": "Data berhasil disimpan."
  }
  ```

<br>

#### GET COURSES

- Method: GET
- Endpoint: `api/course/`

This endpoint will return all course.

- Query Params (optional):

  | Key      | Value         |
  | -------- | ------------- |
  | orderBy  | ASC/DESC/FREE |
  | keywords | string        |

- Response:
  ```json
  {
    "success": true,
    "data": [
        {
            "id": integer,
            "courseName": "string",
            "coursePrice": float,
            "course_images": [
                {
                    "id": integer,
                    "courseId": integer,
                    "courseImage": "string"
                }
            ],
            "course_category": {
                "id": integer,
                "categoryName": "string"
            }
        }
    ]
  }
  ```

<br>

#### GET DETAIL COURSE

- Method: GET
- Endpoint: `api/course/show/:id`

This endpoint will get detailed information about the course.

- Header:

  - Authorization: Bearer Token

- Response:
  ```json
  {
    "success": true,
    "data": {
        "id": integer,
        "courseCategoryId": integer,
        "courseName": "string",
        "courseDescription": "text",
        "coursePrice": float,
        "sold": integer,
        "createdAt": "date",
        "updatedAt": "date",
        "course_category": {
            "id": integer,
            "categoryName": "string"
        },
        "course_images": [
            {
                "id": integer,
                "courseId": integer,
                "courseImage": "string"
            }
        ]
    }
  }
  ```

#### UPDATE COURSE (ADMIN)

- Method: PUT
- Endpoint: `api/course/update`

This endpoint is used for update course.

- Header:
  -Authorization: Bearer Token

- Body:

  ```json
  {
    "id": integer,
    "courseName": "string",
    "courseCategoryId": integer,
    "courseDescription": "string",
    "coursePrice": float
  }
  ```

<br>

#### DESTROY COURSE (ADMIN)

- Method: DELETE
- Endpoint: `api/course/destroy`

This endpoint is used to delete course.

- Header:

  - Authorization: Bearer Token

- Body:
  ```json
  {
    "id": integer
  }
  ```

<br>

### Course Image

#### UPDATE IMAGE (ADMIN)

- Method: PUT,
- Endpoint: `api/course/store`

This endpoint is used to change course image.

- Header:

  - Content-Type: multipart/form-data
  - Authorization: Bearer Token

- Body:

  | Key               | Value   |
  | ----------------- | ------- |
  | courseName        | string  |
  | courseCategoryId  | integer |
  | courseDescription | text    |
  | coursePrice       | float   |
  | courseImage       | file    |

- Response:

  ```json
  {
    "success": true,
    "message": "Data berhasil disimpan."
  }
  ```

<br>

### Course Category

#### GET CATEGORIES

- Method: GET
- Endpoint: `api/course-category/`

This endpoint is used to get all category available.

- Response:

  ```json
  {
    "success": true,
    "data": [
        {
            "id": integer,
            "categoryName": "string"
        }
    ]
  }
  ```

<br>

#### GET POPULARS

- Method: GET
- Endpoint: `api/course-category/popular`

This endpoint is used to get all currently popular categories.

- Response:

  ```json
  {
    "success": true,
    "data": [
        {
            "id": integer,
            "categoryName": "string"
        }
  }
  ```

#### STORE CATEGORY

- Method: GET
- Endpoint: `api/course-category/store`

This endpoint is used to store category.

- Header:

  - Authorizarion: Bearer Token

- Body:

  ```json
  {
    "categoryName": "string"
  }
  ```

- Response:
  ```json
  {
    "success": true,
    "message": "Data berhasil disimpan."
  }
  ```

<br>

### Admin Site

#### GET TOTAL USER

- Method: GET
- Endpoint: `api/admin/total-user`

This endpoint is used to get total of registered users.

- Header:

  - Authorization: Bearer Token

- Response:
  ```json
  {
    "success": true,
    "data": integer
  }
  ```

<br>

#### GET TOTAL COURSE

- Method: GET
- Endpoint: `api/admin/total-course`

This endpoint is used to get total available courses.

- Header:

  - Authorization: Bearer Token

- Response:
  ```json
  {
    "success": true,
    "data": integer
  }
  ```

<br>

#### GET TOTAL FREE COURSE

- Method: GET
- Endpoint: `api/admin/total-free`

This endpoint is used to get total free courses.

- Header:

  - Authorization: Bearer Token

- Response:

  ```json
  {
    "success": true,
    "data": integer
  }
  ```
