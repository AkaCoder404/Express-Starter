# Express-Starter

This is a starter application for an express js server to build APIs. It contains what I believe is a good app architecture should be. All suggestions are appreciated!

Currently, it has boiler plate code for a 3 layer architecture: User -> Routes -> Controllers -> Services -> Models -> DB. 

More can be found here about Express.js project architecture here on [飞书](https://lft4un1s0v.feishu.cn/docx/ILghd7ICiott1Yxkbbcc3BZ5nHc?from=from_copylink).

By default, we use MySQL as the database. In this case, since we don't use an ORM, we can make calls directly in the service layer, therefore `models/` is left blank. I will address this later.


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

## Background
This sample API has one main resource/component, which has the following paths.

```sh
api/users/create_user   # POST request
api/users/get_user      # GET request
api/users/update_user   # PUT request
api/users/delete_user   # DELETE request
```

## Background
This sample API has one main resource/component, which has the following paths.

```shell
% curl -X GET -H "Content-Type: application/json" -d '{"username":"John Doe"}' http://localhost:8001/api/users/get_user
```

Here is the following result
```json
[{"id":1,"username":"John Doe","email":"john.doe@gmail.com","password":"password","created_at":"2024-04-09T22:09:56.000Z"}
```

Another
```shell
% curl -X GET  http://localhost:8001/api/users/get_all_users
```

with the results
```json
[{"id":1,"username":"John Doe","email":"john.doe@gmail.com","password":"password","created_at":"2024-04-09T22:09:56.000Z"},{"id":2,"username":"Jane Doe","email":"jane.doe@gmail.com","password":"password","created_at":"2024-04-09T22:09:56.000Z"},{"id":3,"username":"Mike Doe","email":"mike.doe@gmail.com","password":"password","created_at":"2024-04-09T22:09:56.000Z"}]
```

## File Hiearchy
The project hiearchy is as described
```

```

## Tips
Here are some more tips.
1. Separate config files based on purpose. `db.config.js` for database configurement, `thirdparty.config.js` for third party app configurement, etc...
2. Understand your data layer needs, comparing data driver (handwritten SQL queries) vs ORM models to define how `models/` should be used.


## TODO
- AWS CloudFormation templating for easy aws deploy
- Docker for easy database setup
- Pub/Sub Component
- Boilerplate for JWT Authentication

