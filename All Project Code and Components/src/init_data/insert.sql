-- User Test Data
INSERT INTO users (username, password) VALUES ('adminUser', 'abc123');
INSERT INTO users (username, password) VALUES ('John Doe', '193753');
INSERT INTO users (username, password) VALUES ('Mary Jane', '131242');
INSERT INTO users (username, password) VALUES ('Peter Parker', '123152');
INSERT INTO users (username, password) VALUES ('Bruce Wayne', '027212');
INSERT INTO users (username, password) VALUES ('Clack Kent', '281470');
--INSERT INTO users (username, password) VALUES ('testuser1', '2b$10$GOPFX0c2.8j80e2EIQ4VEOctCO5p1EI07ozxwgFUvwlj0AthOcthm');

-- Test Items for testuser1

INSERT INTO watchlist (userId, productId, itemImage, itemName, itemPrice, initialPrice, lowPrice, itemUrl, watchPrice) VALUES (7, 204279755490, 'https://i.ebayimg.com/thumbs/images/g/8koAAOSwYQpkNAwf/s-l140.jpg', '2023 Topps Series 1 MLB Baseball Collector''s Super Box Trading Cards', 54.99, 55.99, 54.99, 'https://www.ebay.com/itm/2023-Topps-Series-1-MLB-Baseball-Collectors-Super-Box-Trading-Cards-/204279755490', 53.89);
INSERT INTO watchlist (userId, productId, itemImage, itemName, itemPrice, initialPrice, lowPrice, itemUrl, watchPrice) VALUES (7, 144259997552, 'https://i.ebayimg.com/thumbs/images/g/dSwAAOSwlQhhc7t~/s-l140.jpg', '1999 Pokemon Base Set: Choose Your Card! All Pokemon Available!', 59.95, 59.95, 58.87, 'https://www.ebay.com/itm/1999-Pokemon-Base-Set-Choose-Your-Card-All-Pokemon-Available-/144259997552?var=443568019915', 64.99);
INSERT INTO watchlist (userId, productId, itemImage, itemName, itemPrice, initialPrice, lowPrice, itemUrl, watchPrice) VALUES (7, 155513246138, 'https://i.ebayimg.com/thumbs/images/g/840AAOSwnZxkRWHf/s-l140.jpg', 'adidas Originals Adifom Q Shoes Men''s', 90.00, 91.00, 90.00, 'https://www.ebay.com/itm/adidas-Originals-Adifom-Q-Shoes-Mens-/155513246138?var=0', 90.50);

-- Inventory Test Data
INSERT INTO inventory (inventory_name) VALUES ('Living Room');
INSERT INTO inventory (inventory_name) VALUES ('Bath Room');
INSERT INTO inventory (inventory_name) VALUES ('Outdoor');
INSERT INTO inventory (inventory_name) VALUES ('Kitchen');
INSERT INTO inventory (inventory_name) VALUES ('Garage');

-- Product Test Data
INSERT INTO products (product_name, product_category, product_quantity, last_price, last_purchase) VALUES ('bleach', 'cleaning', 2, 4.99, '2023-12-20');
INSERT INTO products (product_name, product_category, product_quantity, last_price, last_purchase) VALUES ('wrench', 'tools', 2, 10.49, '2021-10-20');
INSERT INTO products (product_name, product_category, product_quantity, last_price, last_purchase) VALUES ('dish soap', 'cleaning', 2, 1.99, '2022-06-20');
INSERT INTO products (product_name, product_category, product_quantity, last_price, last_purchase) VALUES ('windex', 'cleaning', 2, 7.99, '2021-01-20');
INSERT INTO products (product_name, product_category, product_quantity, last_price, last_purchase) VALUES ('engine oil', 'automotive', 2, 34.99, '2021-01-20');
INSERT INTO products (product_name, product_category, product_quantity, last_price, last_purchase) VALUES ('salt', 'food', 2, 3.85, '2021-01-20');

-- All Products Scaped 
INSERT INTO all_products (all_product_name, all_product_category, current_price) VALUES ('sugar', 'food', 0.99);
INSERT INTO all_products (all_product_name, all_product_category, current_price) VALUES ('pepper', 'food', 0.99);
INSERT INTO all_products (all_product_name, all_product_category, current_price) VALUES ('bath towels', 'home', 12.99);
INSERT INTO all_products (all_product_name, all_product_category, current_price) VALUES ('toothpast', 'home', 0.99);
INSERT INTO all_products (all_product_name, all_product_category, current_price) VALUES ('paper towels', 'home', 0.99);


