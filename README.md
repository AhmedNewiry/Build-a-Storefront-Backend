# Storefront Backend Project


### Author: Ahmed Abd Al-Fattah Abd Al-Sattar

# You can test my API by visiting the following link and adding the required endpoint route after starting the server:
http://localhost:3000/api

# Backend Port:
- 3000
# Database Port:
- 5432


# You can compile typescript code into javascript using the following command:
 yarn build
 
# You can start the server containing the API  by executing the following command:
 yarn start


# You can compile the typescript code and perform jasmine testing by executing the following command:
yarn test

# You can run prettier by executing the following command:
yarn prettier

# You can run tsc-watch by executing the following command:
yarn watch

# You can run eslint by executing the following command:
yarn lint

## Database setup and connection:

# How to setup  and connect to the "dev" database:
`psql postgres`
`CREATE USER magical_user WITH PASSWORD 'password123';`
`CREATE DATABASE postgres;`
`\c postgres`
`GRANT ALL PRIVELEGES ON DATABASE postgres TO magical_user;`


# How to setup and connect to the "test" database:
`psql postgres`
`CREATE DATABASE postgres_test;`
`\c postgres_test`
`GRANT ALL PRIVELEGES ON DATABASE postgres TO magical_user;`

## All project dependencies and dev-dependencies are installed using `yarn`  node package manager

* You can install project dependencies using the following code `yarn add <dependency>`
* You can install project dev-dependencies using the following code `yarn add -D <dev-dependency>`

## Dependencies:
* "bcrypt": "^5.0.1",
* "body-parser": "^1.19.2"
* "db-migrate": "^0.11.13"
* "db-migrate-pg": "^1.2.2"
* "dotenv": "^16.0.0"
* "express": "^4.17.3"
* "global": "^4.4.0"
* "jasmine": "^4.0.2"
* "jsonwebtoken": "^8.5.1"
* "pg": "^8.7.3"
* "supertest": "^6.2.2"
* "typescript": "^4.6.3"
*  "cors": "^2.8.5"
# Dev-dependencies:
* "@types/bcrypt": "^5.0.0",
* "@types/dotenv": "^8.2.0",
* "@types/eslint": "^8.4.1",
* "@types/express": "^4.17.13",
* "@types/jasmine": "^4.0.0",
* "@types/jsonwebtoken": "^8.5.8",
* "@types/node": "^17.0.23",
* "@types/nodemon": "^1.19.1",
* "@types/pg": "^8.6.5",
* "@types/prettier": "^2.4.4",
* "@types/supertest": "^2.0.12",
* "@typescript-eslint/eslint-plugin": "^5.16.0",
* "@typescript-eslint/parser": "^5.16.0",
* "@types/cors": "^2.8.12",
* "eslint": "^8.11.0",
* "eslint-config-prettier": "^8.5.0",
* "eslint-plugin-prettier": "^4.0.0",
* "jasmine-spec-reporter": "^7.0.0",
* "jasmine-ts": "^0.4.0",
* "nodemon": "^2.0.15",
* "prettier": "^2.6.1",
* "rimraf": "^3.0.2",
* "ts-node": "^10.7.0",
* "tsc-watch": "^4.6.2"



