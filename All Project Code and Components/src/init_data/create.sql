-- contains all users 
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL, 
    password CHAR(60) NOT NULL
);

<<<<<<< HEAD
DROP TABLE IF EXISTS watchlist CASCADE;
=======

>>>>>>> main
CREATE TABLE watchlist (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  productId BIGINT NOT NULL,
  itemImage TEXT NOT NULL,
  itemName TEXT NOT NULL,
  itemPrice NUMERIC(10, 2) NOT NULL,
  initialPrice NUMERIC(10, 2),
  lowPrice NUMERIC(10, 2),
  itemUrl TEXT NOT NULL,
  watchPrice NUMERIC(10, 2)
);

-- contains all the inventories created by the user 
DROP TABLE IF EXISTS inventory CASCADE;
CREATE TABLE inventory(
<<<<<<< HEAD
    inventory_id SERIAL PRIMARY KEY NOT NULL,
=======
    inventory_id SERIAL PRIMARY KEY,
>>>>>>> main
    inventory_name VARCHAR(50) NOT NULL
);

-- holds all items in a given inventory
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
<<<<<<< HEAD
    product_id SERIAL PRIMARY KEY NOT NULL,
=======
product_id SERIAL PRIMARY KEY,
>>>>>>> main
    product_name VARCHAR(50) NOT NULL,
    product_category VARCHAR(50), 
    product_quantity INT,
    last_price NUMERIC,
    last_purchase DATE
);

-- holds all items we have scraped 
DROP TABLE IF EXISTS all_products CASCADE;
CREATE TABLE all_products(
<<<<<<< HEAD
    all_product_id SERIAL PRIMARY KEY NOT NULL,
    all_product_name VARCHAR(50) NOT NULL,
    all_product_catagory VARCHAR(50),
=======
    all_product_id SERIAL PRIMARY KEY,
    all_product_name VARCHAR(50) NOT NULL,
    all_product_category VARCHAR(50), 
>>>>>>> main
    current_price NUMERIC
);

DROP TABLE IF EXISTS user_to_inventories CASCADE;
CREATE TABLE user_to_inventories(
    user_id INT NOT NULL,
    inventory_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(userId),
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
);

DROP TABLE IF EXISTS inventory_to_products CASCADE;
CREATE TABLE inventory_to_products(
    product_id INT NOT NULL,
    inventory_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
);

DROP TABLE IF EXISTS products_to_all_products CASCADE;
CREATE TABLE products_to_all_products(
    product_id INT NOT NULL,
    all_product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (all_product_id) REFERENCES all_products(all_product_id)
<<<<<<< HEAD
);
=======
);
>>>>>>> main
