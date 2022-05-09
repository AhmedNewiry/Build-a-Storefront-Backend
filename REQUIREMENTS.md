# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  and its route is '/products/' [GET] 
- Show  and its route is '/products/:id' [GET] 
- Create [token required] and its route is '/products/' [POST] 


#### Users
- Index [token required] and its route is '/users/' [GET] 
- Show [token required] and its route is '/users/:id' [GET] 
- Create and its route is '/users/' [POST] 
- authentication and its route is '/users/authenticate' [POST] 

#### Orders

- index and its route is '/orders/' [GET] 
- show  and its route is '/orders/:id' [GET] 
- create and its route is '/orders/' [POST] 
- Current Order by user (args: user id)[token required] and its route is '/orders/:user_id'  [GET] 
- addProduct [token required] and its route is '/orders/order_id/products'  [POST] 


## Data Shapes
#### Product
-  id
- name
- price
-  category

#### User
- id
- firstName
- lastName
- email
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
  
#### The Postgres database tables
- TABLE: users(id BIGSERIAL NOT NULL PRIMARY KEY,first_name VARCHAR(250) NOT NULL ,last_name VARCHAR(250) NOT NULL,email TEXT NOT NULL ,password VARCHAR NOT NULL,UNIQUE(email));

- TABLE: products(id BIGSERIAL NOT NULL PRIMARY KEY, name VARCHAR(250) NOT NULL, price int NOT NULL,category VARCHAR(250) NOT NULL );

- TABLE: orders(id BIGSERIAL NOT NULL PRIMARY KEY,product_quantity int NOT NULL,order_status VARCHAR(10) NOT NULL, user_id BIGINT REFERENCES users(id) NOT NULL[foreign key to users table]);

- TABLE: product_orders(id BIGINT NOT NULL PRIMARY KEY,quantity INT NOT NULL,product_id BIGINT REFERENCES prodcust(id) NOT NULL ON DELETE CASCADE [foreign key to products table],oder_id BIGINT REFERENCES orders(id) NOT NULL ON DELETE CASCADE [foreign key to orders table]);;


