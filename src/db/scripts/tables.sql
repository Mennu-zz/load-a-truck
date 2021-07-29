CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `phone` varchar(255),
  `password` varchar(255),
  `created_at` timestamp,
  `role` varchar(255),
  `blocked` boolean,
  `confirmed` boolean,
  `reset_password_token` varchar(255),
  `confirmation_token` varchar(255),
  `provider` varchar(255)
);

CREATE TABLE `user_address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `state` varchar(255),
  `city` varchar(255),
  `country` varchar(255),
  `address_line1` varchar(255),
  `address_line2` varchar(255),
  `phone_number` varchar(255)
);

CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `slug` varchar(255),
  `category_id` int,
  `category_name` varchar(255),
  `sub_category_id` int,
  `sub_category_name` varchar(255)
);

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `icon` varchar(255)
);

CREATE TABLE `sub_category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `product_stock` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `sku` varchar(255),
  `price` varchar(255),
  `product_id` int,
  `added_on` datetime,
  `import_from` varchar(255),
  `quantity` varchar(255)
);

CREATE TABLE `purchase_product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int,
  `quantity` int,
  `price` float8,
  `cart_id` int,
  `order_id` int
);

CREATE TABLE `cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `total_price` float8,
  `tax` float8
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `status` varchar(255),
  `total_price` float8,
  `tax` float8,
  `user_address_id` int,
  `payment_status` varchar(255),
  `payment_id` int
);

CREATE TABLE `payment_status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `order_id` int,
  `status` varchar(255),
  `response` varchar(255)
);

ALTER TABLE `user_address` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`id`);

ALTER TABLE `product_stock` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `purchase_product` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `purchase_product` ADD FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);

ALTER TABLE `purchase_product` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_address_id`) REFERENCES `user_address` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`payment_id`) REFERENCES `product_stock` (`id`);

ALTER TABLE `payment_status` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
