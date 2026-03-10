-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2026 at 10:34 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portal_samochody`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `marki`
--

CREATE TABLE `marki` (
  `MarkaID` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `modele`
--

CREATE TABLE `modele` (
  `ModelID` int(11) NOT NULL,
  `MarkaID` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ogloszenia`
--

CREATE TABLE `ogloszenia` (
  `UniqueID` int(11) NOT NULL,
  `id_samochodu` int(11) NOT NULL,
  `poj_silnika` int(11) DEFAULT NULL,
  `typ_silnika` varchar(50) DEFAULT NULL,
  `przebieg` int(11) DEFAULT NULL,
  `rocznik` year(4) DEFAULT NULL,
  `stan` varchar(50) DEFAULT NULL,
  `rodzaj_napedu` varchar(50) DEFAULT NULL,
  `id_sprzedawcy` int(11) NOT NULL,
  `typ_nadwozia` varchar(50) DEFAULT NULL,
  `opis` text DEFAULT NULL,
  `data_dodania` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `userID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `marki`
--
ALTER TABLE `marki`
  ADD PRIMARY KEY (`MarkaID`);

--
-- Indeksy dla tabeli `modele`
--
ALTER TABLE `modele`
  ADD PRIMARY KEY (`ModelID`),
  ADD KEY `MarkaID` (`MarkaID`);

--
-- Indeksy dla tabeli `ogloszenia`
--
ALTER TABLE `ogloszenia`
  ADD PRIMARY KEY (`UniqueID`),
  ADD KEY `idx_model` (`id_samochodu`),
  ADD KEY `idx_sprzedawca` (`id_sprzedawcy`),
  ADD KEY `idx_rocznik` (`rocznik`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `marki`
--
ALTER TABLE `marki`
  MODIFY `MarkaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `modele`
--
ALTER TABLE `modele`
  MODIFY `ModelID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ogloszenia`
--
ALTER TABLE `ogloszenia`
  MODIFY `UniqueID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `modele`
--
ALTER TABLE `modele`
  ADD CONSTRAINT `modele_ibfk_1` FOREIGN KEY (`MarkaID`) REFERENCES `marki` (`MarkaID`) ON DELETE CASCADE;

--
-- Constraints for table `ogloszenia`
--
ALTER TABLE `ogloszenia`
  ADD CONSTRAINT `ogloszenia_ibfk_1` FOREIGN KEY (`id_samochodu`) REFERENCES `modele` (`ModelID`) ON DELETE CASCADE,
  ADD CONSTRAINT `ogloszenia_ibfk_2` FOREIGN KEY (`id_sprzedawcy`) REFERENCES `uzytkownicy` (`userID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
