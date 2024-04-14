# Express-Starter

[ci-badge]: https://github.com/AkaCoder404/Express-Starter/actions/workflows/main.yml/badge.svg
[ci-workflow]: https://github.com/AkaCoder404/Express-Starter/actions/workflows/main.yml

This is a boilerplate/starter project for quickly building an express js server to build a RESTful APIs. It contains what I believe is a good app architecture should be. All suggestions are appreciated! Currently, it has boiler plate code for a 3 layer architecture. More can be found here about Express.js project architecture here on [飞书](https://lft4un1s0v.feishu.cn/docx/ILghd7ICiott1Yxkbbcc3BZ5nHc?from=from_copylink).

By default, we use MySQL as the database. In this case, since we don't use an ORM, we can make calls directly in the service layer, therefore `models/` is left blank. 

## Running
In order to quickly run the project. 

1. Install the correct node version using `nvm use`
2. Install packages using `npm install`
3. Setup MySQL database server using `docker-compose --env-file .env -f docker/docker-compose.yml up -d`, create tables using `public/mysql_db_schema.sql`, and create `.env` file your DB information.
```sh
PORT=8001

# MySQL
MYSQL_HOST="localhost"
MYSQL_PORT=3306
MYSQL_USER="root"
MYSQL_PASSWORD="root"
MYSQL_DATABASE="test"
```
4. Run project using `npm run dev`. 


## Project Structure
The project hiearchy is shown below
```
src\
 |--config\         # Environment variables and configuration related values
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app entry
 |--database.js     # Database connection
 |--middleware.js   # Custom express middleware
tests\              # Contain tests

```

## API Documentation
This sample API has one main resource/component, which has the following paths.

```sh
api/v1/auth/login          # POST request
api/v1/auth/register       # POST request
api/v1/users/create_user   # POST request
api/v1/users/get_user      # GET request
api/v1/users/get_users     # GET request
api/v1/users/update_user   # PUT request
api/v1/users/delete_user   # DELETE request
```

## Functionality
This boilerplate includes...
1. 3 Layer Architecture
2. Middleware Support
3. JWT for Authentication
4. Basic Unit and Integration Tests
5. Github Workflow for CI/CD

## E2E Testing
Postmon workspace ~ in progress

## Middleware

## Tips
Here are some more tips.
1. Separate config files based on purpose. `db.config.js` for database configurement, `thirdparty.config.js` for third party app configurement, etc...
2. Understand your data layer needs, comparing data driver (handwritten SQL queries) vs ORM models to define how `models/` should be used.


## TODO
- AWS CloudFormation templating for easy aws deploy
- Pub/Sub Component
- Redis for Caching/Fast Memory Support
- Authorization/Validation
- Password hashing
- Loaders logic seperation

