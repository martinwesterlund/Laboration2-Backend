-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 11, 2020 at 07:25 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `reset_fees` ()  BEGIN
	UPDATE members SET members.late_fees = 0 WHERE 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `first_name`, `last_name`) VALUES
(1, 'David', 'Lagercrantz'),
(2, 'Pascal', 'Engman'),
(3, 'Anna', 'Roos'),
(4, 'Emelie', 'Schepp'),
(5, 'Viveca', 'Sten'),
(6, 'Katarina', 'Wennstam'),
(7, 'Mons', 'Kallentoft'),
(8, 'Anna', 'Karolina');

-- --------------------------------------------------------

--
-- Table structure for table `author_books`
--

CREATE TABLE `author_books` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `author_books`
--

INSERT INTO `author_books` (`id`, `author_id`, `book_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 6, 3),
(4, 6, 4),
(5, 2, 5),
(6, 5, 6),
(7, 4, 7),
(8, 3, 8),
(9, 7, 9),
(10, 8, 9);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `book_name` varchar(50) NOT NULL,
  `pages` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book_name`, `pages`) VALUES
(1, 'Hon som måste dö', 234),
(2, 'Mannen som sökte sin skugga', 322),
(3, 'Vargen', 349),
(4, 'Stenhjärtat', 341),
(5, 'Råttkungen', 286),
(6, 'I hemlighet begravd', 345),
(7, 'Broder Jakob', 384),
(8, 'Lika i döden', 512),
(9, 'Albino', 439),
(11, 'Klubben', 280);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `late_fees` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `first_name`, `last_name`, `late_fees`) VALUES
(1, 'Jörgen', 'Jonglör', 100),
(2, 'Bengt', 'Borrare', 0),
(3, 'Kalle', 'Klåpare', 50),
(4, 'Stina', 'Syssling', 0),
(5, 'Urban', 'Uggla', 100),
(6, 'Pippi', 'Pollett', 150),
(7, 'Sissi', 'Stavfel', 0),
(8, 'Dejan', 'Drejare', 0);

-- --------------------------------------------------------

--
-- Table structure for table `members_books`
--

CREATE TABLE `members_books` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members_books`
--

INSERT INTO `members_books` (`id`, `member_id`, `book_id`) VALUES
(1, 5, 3),
(2, 2, 3),
(3, 1, 8),
(4, 2, 7),
(5, 3, 6),
(6, 8, 4),
(7, 7, 1),
(8, 4, 5),
(9, 6, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `author_books`
--
ALTER TABLE `author_books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members_books`
--
ALTER TABLE `members_books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `author_books`
--
ALTER TABLE `author_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `members_books`
--
ALTER TABLE `members_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
