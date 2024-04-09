# Express-Starter

This is a starter application for an express js server to build APIs. It contains what I believe is a good app architecture should be.

Currently, it has boiler plate code for a 3 layer architecture: User -> Routes -> Controllers -> Services -> Models -> DB. 

More can be found here about Express.js project architecture here on [飞书](https://lft4un1s0v.feishu.cn/docx/ILghd7ICiott1Yxkbbcc3BZ5nHc?from=from_copylink).

By default, we use MySQL as the database. In this case, since we don't use an ORM, we can make calls directly in the service layer, therefore `models/` is left blank.

## Background
This sample API has one main resource/component, which has the following paths.

```sh
api/users/create_user   # POST request
api/users/get_user      # GET request
api/users/update_user   # PUT request
api/users/delete_user   # DELETE request
```

## Running
In order to quickly run the project. 

1. Install the correct node version using `nvm use`
2. Install packages using `npm install`
3. Setup MySQL database server, create tables, and create `.env` file your DB information.
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