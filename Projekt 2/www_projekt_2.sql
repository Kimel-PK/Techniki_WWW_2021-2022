-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Sty 2022, 12:56
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `www_projekt_2`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dania`
--

CREATE TABLE `dania` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `cena` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `dania`
--

INSERT INTO `dania` (`id`, `nazwa`, `cena`) VALUES
(1, 'Margharita (31cm)', '26.00'),
(2, 'Funghi (31cm)', '27.00'),
(3, 'Capriccioza (31cm)', '31.00'),
(4, 'Peperoni (41cm)', '42.00'),
(5, 'Pepe (61cm)', '61.00'),
(6, 'Hawajska (41cm)', '38.00'),
(7, 'Rosół', '15.00'),
(8, 'Kotlet Schabowy', '13.00'),
(9, 'Gulasz Ognisty', '17.00'),
(10, 'Kanapka z Wilka', '8.49'),
(11, 'Zupa z Pełzacza', '20.00'),
(12, 'Potrawka z Chrząszcza', '8.99'),
(13, 'Szybki Śledź', '3.50'),
(14, 'Mroczny Paladyn', '35.29'),
(15, 'Szczur na Patyku', '4.88'),
(16, 'Szaszłyk ze Ścierwojada', '17.00'),
(17, 'Ziołowa Zupa z Trolla', '29.00'),
(18, 'Pierogi z Węża', '21.00'),
(19, 'Nędzna Zupa z Chwastów', '2.50'),
(20, 'Kremówka', '21.37');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `id_restauracja` int(11) DEFAULT NULL,
  `id_danie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `menu`
--

INSERT INTO `menu` (`id`, `id_restauracja`, `id_danie`) VALUES
(20, 1, 2),
(18, 1, 7),
(19, 1, 8),
(21, 1, 20),
(7, 2, 9),
(8, 2, 10),
(9, 2, 11),
(10, 2, 12),
(11, 2, 13),
(12, 2, 14),
(13, 2, 15),
(14, 2, 16),
(15, 2, 17),
(16, 2, 18),
(17, 2, 19),
(1, 3, 1),
(3, 3, 2),
(2, 3, 3),
(5, 3, 4),
(6, 3, 5),
(4, 3, 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `restauracje`
--

CREATE TABLE `restauracje` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `zdjęcie` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `opis` text COLLATE utf8_polish_ci DEFAULT NULL,
  `miasto` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `ulica` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `numer_lokalu` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `kod_pocztowy` varchar(6) COLLATE utf8_polish_ci DEFAULT NULL,
  `miasto_poczta` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `restauracje`
--

INSERT INTO `restauracje` (`id`, `nazwa`, `zdjęcie`, `opis`, `miasto`, `ulica`, `numer_lokalu`, `kod_pocztowy`, `miasto_poczta`) VALUES
(1, 'Restaurancja \"U Piotrka\"', 'https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_960_720.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mauris mauris, varius sed purus ut, pulvinar cursus justo. Maecenas lectus dolor, ultricies eu ex in, vestibulum consequat mauris. Aenean eu convallis augue. Phasellus imperdiet pulvinar dui sit amet hendrerit. Fusce libero velit, venenatis sed pharetra sit amet, eleifend a quam. Pellentesque ultricies libero vitae lorem euismod fringilla. Vestibulum ut eleifend neque, tincidunt sodales elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam libero odio, iaculis vel ligula nec, mattis sollicitudin massa.', 'Wadowice', 'Jana Pata II', '21/37', '01-337', 'Wadowice'),
(2, 'Kuchnia Snafa', 'https://cdn.discordapp.com/attachments/632272942096580680/928254467684569148/Snaf.png', 'Sed porttitor vehicula quam, quis sollicitudin enim ultrices vitae. Fusce gravida, velit sit amet sollicitudin accumsan, metus velit malesuada massa, quis pharetra mi felis id arcu. Aenean non lectus ac velit vestibulum mattis dictum vitae libero. In volutpat orci venenatis tellus euismod, a ullamcorper velit dignissim. Pellentesque sed pretium nibh. Donec ut consequat diam. Aenean eu nulla eu purus auctor elementum quis eget massa. Curabitur nec feugiat justo. Aliquam aliquet metus eget elit laoreet, quis viverra mauris interdum.', 'Khorinis', 'ul. Lorda Hagena', NULL, NULL, NULL),
(3, 'Pizzeria Pepe', 'https://cdn.pixabay.com/photo/2015/05/31/11/23/table-791167_960_720.jpg', 'Praesent a egestas nisl. Duis ut ipsum quam. Morbi id ipsum non nisl fermentum mattis. Nulla lacinia urna ex, sit amet cursus eros maximus a. In hac habitasse platea dictumst. Sed scelerisque tellus vitae nisl vulputate semper. Nullam a massa urna. Sed quis risus in nisl fermentum molestie eu in mi.', 'Łódź', 'Jakaś', '51', '53-186', 'Łódź');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `użytkownicy`
--

CREATE TABLE `użytkownicy` (
  `id` int(11) NOT NULL,
  `imię` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `nazwisko` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `hasło_hash` varchar(60) COLLATE utf8_polish_ci NOT NULL,
  `typ` enum('klient','kurier') COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `użytkownicy`
--

INSERT INTO `użytkownicy` (`id`, `imię`, `nazwisko`, `email`, `hasło_hash`, `typ`) VALUES
(1, 'Kamil', 'Ślimak', 'kamil@slimak.pl', '$2b$10$4VBCihqbQJCNSoq8/l6RfeFFtwiYQKinIhQrR8LKp5..w3Aorupky', 'kurier'),
(2, 'Piotr', 'Bożek', 'piotr@bozek.pl', '$2b$10$HWaLThaVO1skrS2dOVMPSO0S6ASa6UfKRNiJYpBcfs6x6r3vNkz3G', 'kurier');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamówienia`
--

CREATE TABLE `zamówienia` (
  `id` int(11) NOT NULL,
  `kod` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `miasto` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `ulica` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `numer_mieszkania` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `status` enum('złożone','w trakcie','zrealizowane','anulowane') COLLATE utf8_polish_ci NOT NULL,
  `id_kurier` int(11) DEFAULT NULL,
  `id_restauracja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamówienie_danie`
--

CREATE TABLE `zamówienie_danie` (
  `ilość` int(11) NOT NULL,
  `id_zamówienie` int(11) NOT NULL,
  `id_danie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dania`
--
ALTER TABLE `dania`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menu_id_danie_id_restauracja_unique` (`id_restauracja`,`id_danie`),
  ADD KEY `id_danie` (`id_danie`);

--
-- Indeksy dla tabeli `restauracje`
--
ALTER TABLE `restauracje`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `użytkownicy`
--
ALTER TABLE `użytkownicy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zamówienia`
--
ALTER TABLE `zamówienia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kurier` (`id_kurier`),
  ADD KEY `id_restauracja` (`id_restauracja`);

--
-- Indeksy dla tabeli `zamówienie_danie`
--
ALTER TABLE `zamówienie_danie`
  ADD PRIMARY KEY (`id_zamówienie`,`id_danie`),
  ADD KEY `id_danie` (`id_danie`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `dania`
--
ALTER TABLE `dania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT dla tabeli `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT dla tabeli `restauracje`
--
ALTER TABLE `restauracje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `użytkownicy`
--
ALTER TABLE `użytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `zamówienia`
--
ALTER TABLE `zamówienia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`id_restauracja`) REFERENCES `restauracje` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `menu_ibfk_2` FOREIGN KEY (`id_danie`) REFERENCES `dania` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `zamówienia`
--
ALTER TABLE `zamówienia`
  ADD CONSTRAINT `zamówienia_ibfk_1` FOREIGN KEY (`id_kurier`) REFERENCES `użytkownicy` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `zamówienia_ibfk_2` FOREIGN KEY (`id_restauracja`) REFERENCES `restauracje` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `zamówienie_danie`
--
ALTER TABLE `zamówienie_danie`
  ADD CONSTRAINT `zamówienie_danie_ibfk_1` FOREIGN KEY (`id_zamówienie`) REFERENCES `zamówienia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `zamówienie_danie_ibfk_2` FOREIGN KEY (`id_danie`) REFERENCES `dania` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
