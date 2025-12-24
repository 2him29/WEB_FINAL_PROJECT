-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 24 déc. 2025 à 11:10
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restolist_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `menus`
--

INSERT INTO `menus` (`id`, `restaurant_id`, `name`, `description`, `price`, `image`, `category`, `created_at`) VALUES
(1, 1, 'Salmon Roll', 'Fresh salmon with rice and seaweed.', 8.50, 'salmon_roll.jpg', 'Main', '2025-11-12 11:05:11'),
(2, 1, 'Tuna Roll', 'Tuna with avocado and rice.', 9.00, 'tuna_roll.jpg', 'Main', '2025-11-12 11:05:11'),
(3, 2, 'Cheese Burger', 'Juicy beef burger with cheese.', 6.00, 'burger.jpg', 'Main', '2025-11-12 11:05:11'),
(4, 2, 'Fries', 'Crispy golden fries.', 2.50, 'fries.jpg', 'Side', '2025-11-12 11:05:11'),
(5, 3, 'Margherita Pizza', 'Classic pizza with tomato and cheese.', 6.50, 'margherita.jpg', 'Main', '2025-11-12 11:05:11'),
(6, 3, 'Pepperoni Pizza', 'Spicy pepperoni with mozzarella.', 8.50, 'pepperoni.jpg', 'Main', '2025-11-12 11:05:11'),
(7, 4, 'Lham Lahlou', 'Sweet, savory, festive Algerian lamb', 17.00, 'lhamlahlo1.jpg', 'main', '2025-12-08 12:35:51'),
(8, 4, 'Rechta', 'Fine noodles, rich chicken stew.', 15.00, 'rechta.jpg', 'main', '2025-12-08 12:53:13'),
(9, 2, 'Waffle Burger', 'The sweet, crunchy, savory sandwich.', 9.00, 'gauffreburger.jpg', 'main', '2025-12-10 12:15:46'),
(10, 3, 'Veggie Pizza', 'Farm-fresh flavors bloom on our perfect, artisanal crust.', 7.50, 'vegetable.jpg', 'main', '2025-12-10 12:28:55'),
(11, 1, 'Uramaki Sushi', '🥢Uramaki Sushi:Inside-out, irresistible flavor.', 9.00, 'uramaki.jpg', 'main', '2025-12-10 12:36:02'),
(12, 4, 'Harira', 'Warm spice, chickpeas, and lentils.', 6.50, 'hrira.jpg', 'main', '2025-12-10 12:54:00'),
(13, 5, 'tortellini', 'Little jewels of Italy, crafted for the perfect bite.', 9.00, 'tortenilli.jpg', 'main', '2025-12-23 17:27:10');

-- --------------------------------------------------------

--
-- Structure de la table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','preparing','delivery','delivered') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `total_amount`, `status`, `created_at`) VALUES
(5, 25.00, 'pending', '2025-12-11 14:56:18'),
(6, 12.00, 'pending', '2025-12-11 14:56:48'),
(7, 14.00, 'pending', '2025-12-13 08:37:41'),
(8, 63.00, 'pending', '2025-12-14 20:30:22');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_item_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `menu_item_id`, `quantity`, `price`, `created_at`) VALUES
(17, 5, NULL, 1, 2.50, '2025-12-11 14:56:18'),
(18, 5, NULL, 1, 9.00, '2025-12-11 14:56:18'),
(19, 5, NULL, 1, 6.00, '2025-12-11 14:56:18'),
(20, 5, NULL, 1, 7.50, '2025-12-11 14:56:18'),
(21, 6, NULL, 2, 6.00, '2025-12-11 14:56:48'),
(22, 7, NULL, 2, 2.50, '2025-12-13 08:37:41'),
(23, 7, NULL, 1, 9.00, '2025-12-13 08:37:41'),
(24, 8, NULL, 4, 6.00, '2025-12-14 20:30:22'),
(25, 8, NULL, 1, 9.00, '2025-12-14 20:30:22'),
(26, 8, NULL, 2, 6.50, '2025-12-14 20:30:22'),
(27, 8, NULL, 1, 17.00, '2025-12-14 20:30:22');

-- --------------------------------------------------------

--
-- Structure de la table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `rating` float DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `description`, `category`, `image`, `address`, `phone`, `rating`, `created_at`) VALUES
(1, 'Sushi Place', 'Fresh and delicious sushi rolls.', 'Sushi', 'sushi_place.jpg', NULL, NULL, 4.5, '2025-11-12 11:05:09'),
(2, 'Burger Steet', 'Tasty fast food burgers.', 'Fast Food', 'Burger_King.jpg', NULL, NULL, 4, '2025-11-12 11:05:09'),
(3, 'Pizza House', 'Best pizzas in town.', 'Pizza', 'pizza_House.jpg', NULL, NULL, 4.3, '2025-11-12 11:05:09'),
(4, 'OklatZman', 'Moments of taste and culture\r\n', 'Traditional', 'tradition.jpg\r\n', NULL, NULL, 5, '2025-12-08 12:25:18'),
(5, 'Cucina', 'Italian flavors kitchen', 'Italian', 'cucina.jpg', NULL, NULL, 4.5, '2025-12-23 17:12:09');

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `rating` float NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reviews`
--

INSERT INTO `reviews` (`id`, `restaurant_id`, `user_name`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 'Alice', 5, 'Best sushi ever!', '2025-11-12 11:05:11'),
(2, 2, 'Bob', 4, 'Good burgers, friendly staff.', '2025-11-12 11:05:11'),
(3, 3, 'Charlie', 4.5, 'Love their pizzas!', '2025-11-12 11:05:11');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, '_ghsty_', 'oy.fodhil@gmail.com', '$2b$10$VPWegqkY/bY4D.JeUfy.hOBcxAn0j9rTARaLK5FMzZBHsFrr.JlZS', '2025-12-11 13:06:39');

-- --------------------------------------------------------

--
-- Structure de la table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `wilaya` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `user_id`, `full_name`, `phone`, `address`, `wilaya`, `city`, `created_at`, `updated_at`) VALUES
(7, 1, 'yacine fodhil', '+213561826147', 'el yasmine', 'alger', 'draria', '2025-12-11 13:22:00', '2025-12-11 13:22:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Index pour la table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Index pour la table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
