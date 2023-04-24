-- User Test Data
INSERT INTO users (username, password) VALUES ('adminUser', 'abc123');
INSERT INTO users (username, password) VALUES ('John Doe', '193753');
INSERT INTO users (username, password) VALUES ('Mary Jane', '131242');
INSERT INTO users (username, password) VALUES ('Peter Parker', '123152');
INSERT INTO users (username, password) VALUES ('Bruce Wayne', '027212');
INSERT INTO users (username, password) VALUES ('Clack Kent', '281470');

-- Inventory Test Data
INSERT INTO inventory (inventory_name) VALUES ('Living Room');
INSERT INTO inventory (inventory_name) VALUES ('Bath Room');
INSERT INTO inventory (inventory_name) VALUES ('Outdoor');
INSERT INTO inventory (inventory_name) VALUES ('Kitchen');
INSERT INTO inventory (inventory_name) VALUES ('Garage');

-- Product Test Data
INSERT INTO products (product_name, product_catagory, product_quantity, last_price, last_purchase) VALUES ('bleach', 'cleaning', 2, 4.99, '2023-12-20');
INSERT INTO products (product_name, product_catagory, product_quantity, last_price, last_purchase) VALUES ('wrench', 'tools', 2, 10.49, '2021-10-20');
INSERT INTO products (product_name, product_catagory, product_quantity, last_price, last_purchase) VALUES ('dish soap', 'cleaning', 2, 1.99, '2022-06-20');
INSERT INTO products (product_name, product_catagory, product_quantity, last_price, last_purchase) VALUES ('windex', 'cleaning', 2, 7.99, '2021-01-20');
INSERT INTO products (product_name, product_catagory, product_quantity, last_price, last_purchase) VALUES ('engine oil', 'automotive', 2, 34.99, '2021-01-20');
INSERT INTO products (product_name, product_catagory, product_quantity, last_price, last_purchase) VALUES ('salt', 'food', 2, 3.85, '2021-01-20');

-- All Products Scaped 
INSERT INTO all_products (all_product_name, all_product_catagory, current_price) VALUES ('sugar', 'food', 0.99);
INSERT INTO all_products (all_product_name, all_product_catagory, current_price) VALUES ('pepper', 'food', 0.99);
INSERT INTO all_products (all_product_name, all_product_catagory, current_price) VALUES ('bath towels', 'home', 12.99);
INSERT INTO all_products (all_product_name, all_product_catagory, current_price) VALUES ('toothpast', 'home', 0.99);
INSERT INTO all_products (all_product_name, all_product_catagory, current_price) VALUES ('paper towels', 'home', 0.99);



