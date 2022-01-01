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
- Axios
- Formik
- Yup

## TODO

### Strona główna

- [X] Lista wszystkich restauracji
- [X] Linki do przejścia na stronę konkretnej restauracji

### Strona restauracji

- [X] Wyświetlenie z bazy nazwy, opisu, adresu
- [ ] Utworzenie formularza na podstawie menu dań przypisanego do restauracji
- [ ] Formularz jako lista dań z możliwością wybrania ilości, na koniec pole do podania adresu
- [ ] Przekierowanie na stronę obserwacji zamówienia

### Strona zamówienia

- [ ] Wypisane informacje o zamówieniu
- [ ] Możliwość rezygnacji z zamówienia jeśli jego status to "złożone"
- [ ] Możliwość obserwowania na bieżąco statusu naszego zamówienia
- [ ] Po zrealizowaniu zamówienia przycisk powrotu na stronę główną

### Panel logowania dla kurierów

- [X] Formularz logowania
- [X] Po zalogowaniu przekierowanie na stronę obsługi zamówień

### Panel kuriera

- [X] Wyświetlenie listy wszystkich złożonych zamówień
- [ ] Możliwość przyjęcia zamówienia
- [ ] Możliwość zmiany statusu przyjętego zamówienia na "zrealizowane"
- [X] Możliwość wylogowania się z panelu kuriera

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
