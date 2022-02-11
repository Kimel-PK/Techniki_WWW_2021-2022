# Projekt 2

Strona internetowa na React.js i Express.js

## Uruchamianie

Do uruchomienia projektu wymagane jest posiadanie zainstalowanego środowiska `Node.js`

### Baza danych

Uruchom lokalny serwer SQL, utwórz bazę danych o nazwie `www_projekt_2`. Aplikacja sama utworzy potrzebne do działania tabele. Możesz także zaimportować przykładowe dane z pliku:

[Plik z przykładową bazą danych](www_projekt_2.sql)

### Serwer

Przejdź do katalogu `/backend`

Zainstaluj wymagane pakiety

```bash
npm install
```

Wpisz komendę

```bash
npm start
```

Serwer Express.js zostanie uruchomiony pod adresem `localhost:3001`

### Klient

Przejdź do katalogu `/frontend`

Zainstaluj wymagane pakiety

```bash
npm install
```

Wpisz komendę

```bash
npm start
```

Serwer React.js zostanie uruchomiony pod adresem `localhost:3000`, otwórz go korzystając z dowolnej przeglądarki.

## Panel logowania kurierów

W przykładowej bazie danych utworzone są domyślnie 2 konta kurierów

```text
Użytkownik: kamil@slimak.pl
Hasło: test123
```

```text
Użytkownik: piotr@bozek.pl
Hasło: bmwe46
```

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

## Ściąga

- backend
  - config - konfiguracja bazy danych
  - models - definicje tabeli bazy danych
  - routes - endpointy backendu
  - index.js - routing backendu i uruchamianie serwera
- frontend
  - public - publiczne zasoby witryny
  - App.js - routing frontendu
  - src
    - pages - pliki podstron

## Endpointy

- Restauracje
  - GET `/restauracje` - Pobierz listę restauracji
  - GET `/restauracje/id/:id` - Pobierz wszystkie dane pojedynczej restauracji
- Użytkownicy
  - GET `/auth/hash/:hasło` - Pobierz hash hasła (do ręcznego wstawienia do bazy)
  - POST `/auth` - Zaloguj się
- Zamówienia
  - POST `/zamowienia/nowe` - Złóż nowe zamówienie
  - POST `/zamowienia/nowe/danie` - Dodaj danie do zamówienia
  - GET `/zamowienia/anuluj/:kod` - Anuluj zamówienie
  - GET `/zamowienia/status/:kod` - Sprawdź status zamówienia
  - POST `/zamowienia/dostepne/` - Lista zamówień dostępnych do przyjęcia przez kuriera
  - POST `/zamowienia/kurier/przyjete` - Lista zamówień przyjętych przez kuriera
  - POST `/zamowienia/kurier/zrealizowane` - Lista zamówień zrealizowanych przez kuriera
- Kurierzy
  - POST `/kurier` - Pobierz dane kuriera
  - POST `/kurier/podejmij` - Oznacz zamówienie jako podjęte
  - POST `/kurier/zrealizuj` - Oznacz zamówienie jako zrelizowane
