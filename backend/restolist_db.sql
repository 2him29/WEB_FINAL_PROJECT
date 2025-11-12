-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 12 nov. 2025 à 12:03
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
(1, 1, 'Salmon Roll', 'Fresh salmon with rice and seaweed.', 8.50, 'images/sushi.jpg', 'Main', '2025-11-12 11:05:11'),
(2, 1, 'Tuna Roll', 'Tuna with avocado and rice.', 9.00, 'images/sushi.jpg', 'Main', '2025-11-12 11:05:11'),
(3, 2, 'Cheese Burger', 'Juicy beef burger with cheese.', 6.00, 'images/burger.jpg', 'Main', '2025-11-12 11:05:11'),
(4, 2, 'Fries', 'Crispy golden fries.', 2.50, 'images/burger.jpg', 'Side', '2025-11-12 11:05:11'),
(5, 3, 'Margherita Pizza', 'Classic pizza with tomato and cheese.', 7.50, 'images/pizza.jpg', 'Main', '2025-11-12 11:05:11'),
(6, 3, 'Pepperoni Pizza', 'Spicy pepperoni with mozzarella.', 8.50, 'images/pizza.jpg', 'Main', '2025-11-12 11:05:11');

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
(1, 'Sushi Place', 'Fresh and delicious sushi rolls.', 'Sushi', 'images/sushi.jpg', NULL, NULL, 4.5, '2025-11-12 11:05:09'),
(2, 'Burger King', 'Tasty fast food burgers.', 'Fast Food', 'images/burger.jpg', NULL, NULL, 4, '2025-11-12 11:05:09'),
(3, 'Pizza Heaven', 'Best pizzas in town.', 'Pizza', 'images/pizza.jpg', NULL, NULL, 4.3, '2025-11-12 11:05:09');

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
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
