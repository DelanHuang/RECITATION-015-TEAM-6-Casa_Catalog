-- contains all users 
DROP TABLE IF EXISTS user CASCADE;
CREATE TABLE user(
    user_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL,
    admin BOOLEAN,
);

-- contains all the inventories created by the user 
DROP TABLE IF EXISTS inventory CASCADE;
CREATE TABLE inventory(
    inventory_id SERIAL PRIMARY KEY NOT NULL
    inventory_name VARCHAR(50) PRIMARY KEY NOT NULL,
);

-- holds all items in a given inventory
DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE products(
    product_id SERIAL PRIMARY KEY NOT NULL
    product_name VARCHAR(50) NOT NULL,
    product_catagory VARCHAR(50), 
    product_quantity INT,
    last_price NUMERIC,
    last_purchase DATE
);

-- holds all items we have scraped 
DROP TABLE IF EXISTS all_products CASCADE;
CREATE TABLE all_products(
    all_product_id SERIAL PRIMARY KEY NOT NULL,
    current_price NUMERIC,
);

DROP TABLE IF EXISTS user_to_inventories CASCADE;
CREATE TABLE user_to_inventories(
    user_id INT NOT NULL,
    inventory_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
);

DROP TABLE IF EXISTS inventory_to_products CASCADE;
CREATE TABLE inventory_to_products(
    product_id INT NOT NULL,
    inventory_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
);

DROP TABLE IF EXISTS products_to_all_products CASCADE;
CREATE TABLE products_to__all_products(
    product_id INT NOT NULL,
    all_product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (all_product_id) REFERENCES all_product(all_product_id)
);