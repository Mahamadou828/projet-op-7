-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  ven. 31 juil. 2020 à 13:14
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `numLike` int(11) NOT NULL,
  `numDislike` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `content`, `numLike`, `numDislike`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES
(2, 'Je suis fascinee', 0, 0, '2020-07-13 15:09:20', '2020-07-13 15:09:20', 40, 1),
(3, 'Pourquoi ce post', 0, 0, '2020-07-13 15:11:06', '2020-07-13 15:11:06', 40, 1),
(4, 'Je suis fascinee', 0, 0, '2020-07-20 12:20:05', '2020-07-20 12:20:05', NULL, 1),
(5, 'Je suis interesser', 0, 0, '2020-07-21 08:37:44', '2020-07-21 08:37:44', 25, 1),
(6, 'Je suis fascinee', 0, 0, '2020-07-21 08:43:58', '2020-07-21 08:43:58', 40, 1),
(7, 'Mahamadou', 0, 0, '2020-07-21 09:15:08', '2020-07-21 09:15:08', NULL, 1),
(8, 'Je suis fascinee', 0, 0, '2020-07-21 09:52:11', '2020-07-21 09:52:11', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `contactList` text COLLATE utf8mb4_bin DEFAULT NULL,
  `FriendRequestList` text COLLATE utf8mb4_bin DEFAULT NULL,
  `BlockedUserList` text COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `createdAt`, `updatedAt`, `UserId`, `contactList`, `FriendRequestList`, `BlockedUserList`) VALUES
(22, '2020-07-18 11:52:31', '2020-07-18 15:53:08', 2, '[]', '[\"1\"]', '[]'),
(23, '2020-07-18 11:52:31', '2020-07-18 15:47:08', 1, '[\"9\"]', '[]', '[]'),
(24, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 3, '[]', '[]', '[]'),
(25, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 5, '[]', '[]', '[]'),
(26, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 4, '[]', '[]', '[]'),
(27, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 6, '[]', '[]', '[]'),
(28, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 7, '[]', '[]', '[]'),
(29, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 8, '[]', '[]', '[]'),
(30, '2020-07-18 11:52:31', '2020-07-18 15:00:09', 9, '[\"1\"]', '[]', '[\"4\"]'),
(31, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 10, '[]', '[]', '[]'),
(32, '2020-07-18 11:52:31', '2020-07-18 11:52:31', 14, '[]', '[]', '[]');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `receiver` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `message` text COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `receiver`, `message`, `createdAt`, `updatedAt`, `UserId`) VALUES
(17, '9', 'Salut', '2020-07-18 16:44:36', '2020-07-18 16:44:36', 1),
(18, '1', 'Ouais ca peut aller', '2020-07-18 16:48:46', '2020-07-18 16:48:46', 9),
(19, '9', 'Bah c\'est bien alors', '2020-07-18 16:49:13', '2020-07-18 16:49:13', 1),
(20, '1', 'Ouais ca peut aller', '2020-07-18 16:49:13', '2020-07-18 16:49:13', 9),
(21, '9', 'Salut', '2020-07-19 16:08:08', '2020-07-19 16:08:08', 1),
(22, '9', 'oUIDAS', '2020-07-21 08:45:51', '2020-07-21 08:45:51', 1);

-- --------------------------------------------------------

--
-- Structure de la table `postrealations`
--

CREATE TABLE `postrealations` (
  `id` int(11) NOT NULL,
  `like` tinyint(1) NOT NULL,
  `dislike` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `postrealations`
--

INSERT INTO `postrealations` (`id`, `like`, `dislike`, `createdAt`, `updatedAt`, `UserId`, `PostId`) VALUES
(1, 0, 1, '2020-06-30 14:10:14', '2020-07-30 11:32:02', 1, 20),
(2, 1, 0, '2020-07-04 15:53:19', '2020-07-04 15:53:24', 1, 26),
(3, 1, 0, '2020-07-04 21:06:16', '2020-07-04 21:06:16', 10, 26),
(5, 1, 0, '2020-07-21 08:37:28', '2020-07-30 11:32:23', 1, 25),
(6, 1, 0, '2020-07-21 08:43:49', '2020-07-30 11:32:27', 1, 40),
(7, 0, 0, '2020-07-21 09:04:26', '2020-07-30 10:53:00', 1, 31),
(8, 0, 1, '2020-07-21 09:52:30', '2020-07-21 09:52:30', 1, 23);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `numLike` int(11) NOT NULL,
  `numDislike` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `image`, `content`, `numLike`, `numDislike`, `createdAt`, `updatedAt`, `UserId`) VALUES
(20, '', 'Nec minus feminae quoque calamitatum participes fuere similium. nam ex hoc quoque sexu peremptae sunt originis altae conplures, adulteriorum flagitiis obnoxiae vel stuprorum. inter quas notiores fuere Claritas et Flaviana, quarum altera cum duceretur ad m', '', NULL, 0, 1, '2020-06-29 16:57:59', '2020-07-30 11:32:02', 1),
(23, 'Test', 'Sed maximum est in amicitia parem esse inferiori. Saepe enim excellentiae quaedam sunt, qualis erat Scipionis in nostro, ut ita dicam, grege. Numquam se ille Philo, numquam Rupilio, numquam Mummio anteposuit, numquam inferioris ordinis amicis, Q. vero Max', 'http://localhost:3030/file/image/3467432_16fcb.jpg1593856331642.jpeg', NULL, 0, 1, '2020-07-04 09:52:11', '2020-07-26 12:48:24', 1),
(25, 'AmaniMarket', 'Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', 'http://localhost:3030/file/image/grocery-f1565ac25de02b9295dccc2da13004ab.png1593860362366.png', NULL, 1, 0, '2020-07-04 10:59:22', '2020-07-30 11:32:23', 1),
(26, 'La foret russe', 'Ideo urbs venerabilis post superbas efferatarum gentium cervices oppressas latasque leges fundamenta libertatis et retinacula sempiterna velut frugi parens et prudens et dives Caesaribus tamquam liberis suis regenda patrimonii iura permisit.', 'http://localhost:3030/file/video/VID20200704132427.mp41593860620398.mp4', NULL, 1, 0, '2020-07-04 11:03:40', '2020-07-04 18:19:06', 1),
(27, '', 'Nec minus feminae quoque calamitatum participes fuere similium. nam ex hoc quoque sexu peremptae sunt originis altae conplures, adulteriorum flagitiis obnoxiae vel stuprorum. inter quas notiores fuere Claritas et Flaviana, quarum altera cum duceretur ad m', 'http://localhost:3030/file/image/Easy-Marinara-Sauce-Recipe.jpg1593888968172.jpeg', NULL, 0, 0, '2020-07-04 18:29:55', '2020-07-04 18:56:08', 1),
(31, NULL, 'Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem. haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum.', NULL, NULL, 0, 0, '2020-07-04 20:42:32', '2020-07-04 20:42:32', 1),
(40, NULL, 'Oportunum est, ut arbitror, explanare nunc causam, quae ad exitium praecipitem Aginatium inpulit iam inde a priscis maioribus nobilem, ut locuta est pertinacior fama. nec enim super hoc ulla documentorum rata est fides.', 'http://localhost:3030/file/image/charisme-femme.jpg1593896764227.jpeg', NULL, 1, 0, '2020-07-04 21:06:04', '2020-07-30 11:32:27', 10);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `surname` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `surname`, `photo`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'opmadou@gmail.com', '$2b$10$6GtPd38Et3Upb88aaWzfZ.BifRo0Mh1fL2234juGjxyBhBYAQhoLy', 'Mahamadou ', 'Samaké', 'http://localhost:3030/file/image/ma_photo.png1593174714431.png', 'Developpeur de cette plateforme ))', '2020-06-26 12:31:54', '2020-06-26 12:31:54'),
(2, 'Nyle@gmail.com', '$2b$10$LFmdpj3A/lT6/cAiQogXDOiwYF15gkhiI.nJ3m8ES/HCcxqYI04ua', 'Nyle ', 'Rawlings', 'http://localhost:3030/file/image/1.jpg1593688092026.jpeg', '', '2020-07-02 11:08:12', '2020-07-02 11:08:12'),
(3, 'Ammarah@gmail.com', '$2b$10$Ye2hhCL0O3zgNX8A4BH2Tuw5Ii0fPbpd5YmdTbKQcozdqM34vzWji', 'Ammarah ', 'Whitaker', 'http://localhost:3030/file/image/11577026.jpg1593688242723.jpeg', '', '2020-07-02 11:10:42', '2020-07-02 11:10:42'),
(4, 'Guy@gmail.com', '$2b$10$86Ri1oFQuHJcWBWazmiorOV/bHidfOA.PiJ70/Nm2xgqDRvh95sGu', 'Guy ', 'Odling', 'http://localhost:3030/file/image/belle_personne_x_maud_sophie_x_ludovic-104hd.jpg1593688352846.jpeg', '', '2020-07-02 11:12:32', '2020-07-02 11:12:32'),
(5, 'Sylvia@gmail.com', '$2b$10$jiA.4op7IRaaASNoDIQTVOa3VTEC1ONQbxtqA8rpFI/s8N.AoMPja', 'Sylvia ', 'Mccallum', 'http://localhost:3030/file/image/charisme-femme.jpg1593688433764.jpeg', '', '2020-07-02 11:13:53', '2020-07-02 11:13:53'),
(6, 'Louisa@gmail.com', '$2b$10$B5zs5.TluSyFObRFC4nJxeNhsFjAenfz3gm3fc2OwjHNIB5LB5c12', 'Louisa ', 'Grey', 'http://localhost:3030/file/image/file-20190708-51253-64slk5.jpg1593688511698.jpeg', '', '2020-07-02 11:15:11', '2020-07-02 11:15:11'),
(7, 'Hazel@gmail.com', '$2b$10$kBbPPT1jGUDdtuUWRIwuDOcWhWGV4vWuQk.IWPRPt.JR8x6IjZfZq', 'Hazel ', 'Coates', 'http://localhost:3030/file/image/kqf31YdQ_400x400.jpg1593688629773.jpeg', '', '2020-07-02 11:17:09', '2020-07-02 11:17:09'),
(8, 'Jamaal@gmail.com', '$2b$10$PTHGrwyrFyAMOCzRybpVruMcMP9zWeIq7wXcodgfvDcWfl.fm0F0O', 'Jamaal ', 'Wardle', 'http://localhost:3030/file/image/TPMP-la-personne-sur-la-photo-utilisée-accable-Hanounagrande.jpg1593688760013.jpeg', '', '2020-07-02 11:19:20', '2020-07-02 11:19:20'),
(9, 'Marshall@gmail.com', '$2b$10$tYx4wOjhJpXfBZC2oLYn8eMEVFwDxh7iX97jkVol5GwCpRPD4ncgO', 'Marshall ', 'Oneal', 'http://localhost:3030/file/image/JPXWDWWULNJLNDB755QSF5BXFI_(1).jpg1593688836718.jpeg', '', '2020-07-02 11:20:36', '2020-07-02 11:20:36'),
(10, 'Dean@gmail.com', '$2b$10$1Sm5MM5o3hDMoQB.AwumjOUgyEcdCrTW48RpLc.WLTbQNrKM82/4K', 'Dean ', 'Dunne', 'http://localhost:3030/file/image/11577026.jpg1593689234705.jpeg', '', '2020-07-02 11:27:14', '2020-07-02 11:27:14'),
(14, 'Benjamin@gmail.com', '$2b$10$yQv4OYl8SeGfIZ3VHxLBKeqcgyMf2tuvgLX/LezMIN.QzipnRO/.u', 'Benjamin', 'Benjamin', 'http://localhost:3030/file/image/TPMP-la-personne-sur-la-photo-utilisée-accable-Hanounagrande.jpg1595070533973.jpeg', 'Benjamin', '2020-07-18 11:08:54', '2020-07-18 11:08:54');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PostId` (`PostId`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `postrealations`
--
ALTER TABLE `postrealations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `postrealations`
--
ALTER TABLE `postrealations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `Comments_UserId_foreign_idx` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_10` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_12` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_13` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_14` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_16` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_17` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_6` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_8` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `postrealations`
--
ALTER TABLE `postrealations`
  ADD CONSTRAINT `postrealations_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_10` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_12` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_13` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_14` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_4` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_6` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_8` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postrealations_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_8` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
