# Projekt 2

Strona internetowa na React.js i Express.js

## Użyte biblioteki

### Backend

- Express.js
- Cors
- Mysql2
- Sequelize
- Sequelize-cli
- Bcrypt

### Frontend

- React.js
- React-Bootstrap
- Axios
- Formik
- Yup

## TODO

### Strona główna

- [X] Lista wszystkich restauracji
- [X] Linki do przejścia na stronę konkretnej restauracji

### Strona restauracji

- [X] Wyświetlenie z bazy nazwy, opisu, adresu
- [X] Formularz zamówienia jako lista dań przypisanych do restauracji z możliwością wybrania ilości, na koniec pola do podania adresu
- [X] Przekierowanie na stronę obserwacji zamówienia

### Strona zamówienia

- [X] Wypisane informacje o zamówieniu
- [X] Możliwość rezygnacji z zamówienia jeśli jego status to "złożone"
- [X] Możliwość obserwowania na bieżąco statusu naszego zamówienia
- [X] Po zrealizowaniu zamówienia przycisk powrotu na stronę główną

### Panel logowania dla kurierów

- [X] Formularz logowania
- [X] Po zalogowaniu przekierowanie na stronę obsługi zamówień

### Panel kuriera

- [X] Wyświetlenie listy wszystkich złożonych zamówień
- [X] Możliwość przyjęcia zamówienia
- [X] Możliwość zmiany statusu przyjętego zamówienia na "zrealizowane"
- [X] Możliwość wylogowania się z panelu kuriera

### Widok mobilny

- [ ] Responsywność (Bootstrap)

## Ściąga

- backend
  - config - konfiguracja bazy danych
  - models - definicje tabeli bazy danych
  - routes - endpointy backendu
  - index.js - routing backendu i uruchamianie serwera
- frontend
  - public - ???
  - App.js - routing frontendu
  - src
    - pages - pliki podstron
