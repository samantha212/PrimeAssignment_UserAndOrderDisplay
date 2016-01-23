-- Order search assignment SQL

-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS addresses;
-- DROP TABLE IF EXISTS orders;

-- Create tables
CREATE TABLE users
(
  id serial NOT NULL,
  name character varying(255) NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);


CREATE TABLE addresses
(
  address_id serial NOT NULL,
  user_id integer,
  address_type character varying(255),
  address_street character varying(255),
  address_city character varying(255),
  address_state character varying(255),
  address_zip character varying(255),
  date_added timestamp without time zone,
  CONSTRAINT addresses_pkey PRIMARY KEY (address_id),
  CONSTRAINT userfk FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE orders
(
  order_id serial NOT NULL,
  user_id integer,
  ship_address_id integer NOT NULL,
  amount numeric,
  order_date timestamp without time zone,
  CONSTRAINT orders_pkey PRIMARY KEY (order_id),
  CONSTRAINT addressfk FOREIGN KEY (ship_address_id)
      REFERENCES addresses (address_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT userfk FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


-- User Data
INSERT INTO users (name) VALUES ('Kris');
INSERT INTO users (name) VALUES ('Scott');
INSERT INTO users (name) VALUES ('Sam'); -- Put in your own name

-- Address Data. Note that user_id must match 1 user id (users.id)
-- Otherwise it will fail due to the Foreign Key Constraint
INSERT INTO addresses (user_id, address_type, address_street, address_city, address_state, address_zip, date_added)
			   VALUES (1, 'Home', '6340 15th Ave S.', 'Richfied', 'MN', '55423', '2015-10-15 14:55:33');
INSERT INTO addresses (user_id, address_type, address_street, address_city, address_state, address_zip, date_added)
			   VALUES (1, 'Work', '9401 James Ave S.', 'Bloomington', 'MN', '55353', '2015-09-15 01:31:33');
INSERT INTO addresses (user_id, address_type, address_street, address_city, address_state, address_zip, date_added)
			   VALUES (1, 'HQ', '748 Underground Lair Blvd', 'Ossining', 'NY', '10038', '2015-01-20 00:44:32');
INSERT INTO addresses (user_id, address_type, address_street, address_city, address_state, address_zip, date_added)
			   VALUES (2, 'Farm', '8230 Winchest Way', 'Delano', 'MN', '55893', 'yesterday');
INSERT INTO addresses (user_id, address_type, address_street, address_city, address_state, address_zip, date_added)
			   VALUES (2, 'Office-2', '92 Big Bear Road.', 'Crescent Lake', 'MI', '77839', '2014-08-15 01:00:31');
INSERT INTO addresses (user_id, address_type, address_street, address_city, address_state, address_zip, date_added)
			   VALUES (3, 'Home', '4423 Sycamore Ln', 'Minneapolis', 'MN', '55423', 'today');
INSERT INTO addresses (user_id, address_type, address_street, address_city, address_state, address_zip, date_added)
			   VALUES (3, 'Office', '9988 Washburn Ave', 'Minneapolis', 'MN', '55402', 'today');



-- Order Data
-- Requires both user_id and ship_address_id to match in the other tables
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (1, 1, 45.77, '2015-11-15 15:58:53.361868');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (1, 1, 105.10, '2015-09-28 11:33:00');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (1, 3, 899.88, '2015-11-14 00:00:13');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (1, 3, 405.00, '2015-10-24 10:44:00');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (1, 2, 99.01, '2015-09-14 06:00:59');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (1, 3, 1893.13, '2015-07-14 00:00:00');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (1, 3, 39.89, '2015-10-05 18:39:55');

INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (2, 4, 87.50, 'yesterday');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (2, 5, 9.13, '2015-11-02 20:08:00');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (2, 5, 731.01, '2015-09-13 19:33:12');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (2, 5, 245.77, '2015-10-24 09:00:00');
INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (2, 5, 78.30, '2015-09-10 09:33:12');

-- Your Orders -- Did you add 2 addresses above? If not, these will fail.
 INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (3, 6, 33.88, '2015-11-02 00:00:11');
 INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (3, 6, 124.11, '2015-11-08 01:32:00');
 INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (3, 7, 19.99, '2015-11-12 05:20:00');
 INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (3, 7, 41.23, '2015-09-13 20:00:00');
 INSERT INTO orders (user_id, ship_address_id, amount, order_date) VALUES (3, 7, 534.89, '2015-10-14 018:44:00');