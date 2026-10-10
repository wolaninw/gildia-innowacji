# 🚀 Checklist Implementacji PocketBase — Gildia Innowacji

> **Czas potrzebny:** 1-2 godziny  
> **Poziom trudności:** Średni  
> **Wymagania:** Dostęp do Internetu, konto Coolify.io (opcjonalnie)

---

## 📦 CO MASZ GOTOWE

✅ **Skrypty HTML:**
- `login.html` - Ekran logowania/rejestracji
- `generator-v2-pb.html` - Generator z autoryzacją
- `migrate-to-pocketbase.html` - Migracja danych
- `pocketbase-debug.html` - Narzędzie diagnostyczne

✅ **Konfiguracja Docker:**
- `Dockerfile` - Konfiguracja kontenera
- `docker-compose.yml` - Docker Compose

✅ **Dokumentacja:**
- `setup-pocketbase.md` - Szczegółowa instrukcja
- `test-pocketbase.md` - Plan testowania

✅ **Dane testowe:**
- `projekty-v2.json` - 8 przykładowych projektów

---

## 🎯 PLAN IMPLEMENTACJI (Do wydruku)

### FAZA 1: INSTALACJA POCKETBASE (30 min)

#### Krok 1.1: Pobierz PocketBase
- [ ] Wejdź na: https://pocketbase.io/docs/
- [ ] Pobierz: `pocketbase_windows_amd64.zip` (dla 64-bit Windows)
- [ ] Rozpakuj do: `D:\Gildia innowacji\gildia-innowacji-main\pocketbase\`
- [ ] Sprawdź czy plik `pocketbase.exe` istnieje

#### Krok 1.2: Uruchom PocketBase
- [ ] Otwórz PowerShell
- [ ] CD do folderu: `cd "D:\Gildia innowacji\gildia-innowacji-main\pocketbase"`
- [ ] Uruchom: `.\pocketbase.exe serve`
- [ ] Sprawdź czy widzisz: "Server started at http://127.0.0.1:8090"
- [ ] Nie zamykaj tego okna (później uruchom w tle)

#### Krok 1.3: Dostęp do Admin Panel
- [ ] Otwórz przeglądarkę: `http://127.0.0.1:8090/_/`
- [ ] Stwórz admin konto:
  - Email: `admin@gildia.pl`
  - Hasło: `Admin123!` (zapamiętaj!)
- [ ] Zaloguj się jako admin
- [ ] Sprawdź czy widzisz dashboard

---

### FAZA 2: KONFIGURACJA BAZY DANYCH (20 min)

#### Krok 2.1: Sprawdź kolekcję "users"
- [ ] W Admin Panel kliknij "Collections"
- [ ] Sprawdź czy kolekcja "users" istnieje
- [ ] Sprawdź pola: email, name, role
- [ ] Jeśli brakuje "role", dodaj jako select: admin, user

#### Krok 2.2: Utwórz kolekcję "projekty"
- [ ] Kliknij "New Collection"
- [ ] Nazwa: `projekty`
- [ ] Dodaj pola:

**Pola tekstowe:**
- [ ] `nazwa_projektu` (text, required)
- [ ] `podkategoria` (text)
- [ ] `omowienie` (text)
- [ ] `pitch` (text)

**Pola select:**
- [ ] `kategoria` (select: spoleczne, biznesowe)
- [ ] `status` (select: koncepcja, backlog, realizacja, prototypowanie, testowanie, wdrozenie, zakonczone)

**Pola daty:**
- [ ] `data_rozpoczecia` (date)
- [ ] `data_zakonczenia` (date)

**Pola JSON:**
- [ ] `cele` (json)
- [ ] `specyfikacje` (json)
- [ ] `media` (json)
- [ ] `tagi` (json)

**Pole URL:**
- [ ] `dokumentacja` (url)

**Relacja:**
- [ ] `author` (relation to users)

#### Krok 2.3: Ustaw uprawnienia dla "projekty"
- [ ] W zakładce "API Rules":
  - [ ] Create: `@request.auth.id != ""` (tylko zalogowani)
  - [ ] Read: `id != ""` (publicznie)
  - [ ] Update: `@request.auth.id == author || @request.auth.role == "admin"`
  - [ ] Delete: `@request.auth.id == author || @request.auth.role == "admin"`

#### Krok 2.4: Ustaw uprawnienia dla "users"
- [ ] W zakładce "API Rules":
  - [ ] Create: `id != ""` (publiczna rejestracja)
  - [ ] Read: `@request.auth.id == id || @request.auth.role == "admin"`
  - [ ] Update: `@request.auth.id == id || @request.auth.role == "admin"`
  - [ ] Delete: `@request.auth.role == "admin"`

---

### FAZA 3: MIGRACJA DANYCH (10 min)

#### Krok 3.1: Sprawdź plik danych
- [ ] Sprawdź czy `projekty-v2.json` istnieje w głównym folderze
- [ ] Otwórz go i sprawdź czy ma 8 projektów

#### Krok 3.2: Uruchom migrację
- [ ] Otwórz w przeglądarce: `migrate-to-pocketbase.html`
- [ ] Sprawdź czy PocketBase działa (instrukcja na stronie)
- [ ] Kliknij "🚀 Rozpocznij migrację"
- [ ] Czekaj na zakończenie
- [ ] Sprawdź komunikat sukcesu

#### Krok 3.3: Weryfikacja w Admin Panel
- [ ] W Admin Panel kliknij na kolekcję "projekty"
- [ ] Sprawdź czy 8 projektów jest widocznych
- [ ] Kliknij na jeden projekt i sprawdź dane
- [ ] Sprawdź czy pola są poprawnie wypełnione

---

### FAZA 4: TEST LOGOWANIA (15 min)

#### Krok 4.1: Rejestracja użytkownika
- [ ] Otwórz: `login.html`
- [ ] Kliknij "Nie masz konta? Zarejestruj się"
- [ ] Wypełnij formularz:
  - Email: `test@gildia.pl`
  - Hasło: `Test123!`
  - Imię: `Test User`
- [ ] Kliknij "Zarejestruj się"
- [ ] Sprawdź komunikat sukcesu

#### Krok 4.2: Logowanie
- [ ] Wypełnij formularz:
  - Email: `test@gildia.pl`
  - Hasło: `Test123!`
- [ ] Kliknij "Zaloguj się"
- [ ] Sprawdź czy przekierowanie do generatora działa

#### Krok 4.3: Weryfikacja w Admin Panel
- [ ] W Admin Panel kliknij na kolekcję "users"
- [ ] Sprawdź czy użytkownik `test@gildia.pl` jest widoczny
- [ ] Sprawdź jego pole "role" (powinno być "user")

---

### FAZA 5: TEST GENERATORA (20 min)

#### Krok 5.1: Sprawdź generator
- [ ] Sprawdź czy jesteś w `generator-v2-pb.html`
- [ ] Sprawdź czy widoczne jest imię użytkownika
- [ ] Sprawdź czy przycisk "🚪 Wyloguj" działa

#### Krok 5.2: Przeglądanie projektów
- [ ] Sprawdź czy 8 projektów jest widocznych na liście
- [ ] Sprawdź czy picker projektów działa
- [ ] Kliknij na "Kiermasz zabawek" z pickera
- [ ] Sprawdź czy szczegóły projektu są widoczne

#### Krok 5.3: Dodanie nowego projektu
- [ ] Kliknij "+ Nowy projekt"
- [ ] Wypełnij podstawowe informacje:
  - Nazwa: "Testowy projekt"
  - Kategoria: "Społeczne"
  - Podkategoria: "Testy"
  - Status: "Koncepcja"
  - Pitch: "Testowy projekt"
- [ ] Kliknij "💾 Zapisz projekt"
- [ ] Sprawdź czy projekt jest na liście

#### Krok 5.4: Edycja projektu
- [ ] Wybierz "Kiermasz zabawek" z pickera
- [ ] Zmień nazwę na "Kiermasz zabawek - test"
- [ ] Kliknij "💾 Zapisz projekt"
- [ ] Sprawdź czy zmiana jest widoczna

#### Krok 5.5: Test sekcji
- [ ] Rozwiń sekcję "🎯 Cele projektu"
- [ ] Wypełnij pola
- [ ] Rozwiń sekcję "⚙️ Specyfikacje"
- [ ] Wypełnij pola
- [ ] Rozwiń sekcję "🖼️ Media"
- [ ] Wypełnij pola
- [ ] Zapisz projekt

---

### FAZA 6: DIAGNOSTYKA (10 min)

#### Krok 6.1: Narzędzie debug
- [ ] Otwórz: `pocketbase-debug.html`
- [ ] Sprawdź status połączenia (powinno być ✅)
- [ ] Sprawdź statystyki:
  - Użytkownicy: powinno być ≥2
  - Projekty: powinno być ≥9
  - Kolekcje: powinno być ≥2
- [ ] Kliknij "👥 Lista użytkowników"
- [ ] Kliknij "📋 Lista projektów"

#### Krok 6.2: Sprawdzenie Admin Panel
- [ ] W Admin Panel sprawdź liczbę użytkowników
- [ ] Sprawdź liczbę projektów
- [ ] Sprawdź strukturę danych
- [ ] Sprawdź czy pola JSON są poprawne

---

### FAZA 7: DODATKOWE TESTY (15 min)

#### Krok 7.1: Test wylogowania
- [ ] Kliknij "🚪 Wyloguj"
- [ ] Sprawdź czy przekierowanie do login.html działa
- [ ] Spróbuj otworzyć generator-v2-pb.html bez logowania
- [ ] Sprawdź czy przekierowanie do login.html działa

#### Krok 7.2: Drugi użytkownik
- [ ] Zarejestruj drugiego użytkownika:
  - Email: `test2@gildia.pl`
  - Hasło: `Test123!`
  - Imię: "Test User 2"
- [ ] Zaloguj jako drugi użytkownik
- [ ] Spróbuj edytować projekt użytkownika test@gildia.pl
- [ ] Sprawdź czy dostajesz błąd uprawnień

#### Krok 7.3: Admin uprawnienia
- [ ] W Admin Panel ustaw użytkownika `test@gildia.pl` jako admin
- [ ] Zaloguj jako admin
- [ ] Spróbuj edytować projekt `test2@gildia.pl`
- [ ] Sprawdź czy edycja działa

---

### FAZA 8: UZUPEŁNIENIE DANYCH (20 min)

#### Krok 8.1: Dodaj projekty testowe
- [ ] Dodaj 2-3 projekty z różnymi kategoriami
- [ ] Dodaj projekty z różnymi statusami
- [ ] Dodaj projekty z mediami (zdjęcia, YouTube)
- [ ] Dodaj projekty z dokumentacją

#### Krok 8.2: Wypełnij wszystkie sekcje
- [ ] Dla jednego projektu wypełnij wszystkie sekcje:
  - Informacje podstawowe ✅
  - Cele projektu ✅
  - Specyfikacje ✅
  - Media ✅
  - Dokumentacja ✅
  - Tagi ✅
- [ ] Zapisz projekt
- [ ] Sprawdź czy dane są poprawne

#### Krok 8.3: Sprawdzenie picker
- [ ] Dodaj nowy projekt
- [ ] Sprawdź czy picker się zaktualizował
- [ ] Edytuj projekt
- [ ] Sprawdź czy picker się zaktualizował

---

## ✅ CHECKLISTA KOŃCOWA

### Techniczne:
- [ ] PocketBase uruchomiony lokalnie
- [ ] Admin Panel dostępny
- [ ] Kolekcja "projekty" skonfigurowana
- [ ] Uprawnienia ustawione poprawnie
- [ ] 8 projektów zmigrowanych

### Funkcjonalne:
- [ ] Rejestracja użytkowników działa
- [ ] Logowanie działa
- [ ] Wylogowanie działa
- [ ] Generator z autoryzacją działa
- [ ] CRUD projektów działa
- [ ] Picker projektów działa

### Bezpieczeństwo:
- [ ] Uprawnienia użytkowników działają
- [ ] Admin może edytować wszystko
- [ ] Użytkownicy nie mogą edytować cudzych projektów
- [ ] Przekierowanie bez logowania działa

### Dane:
- [ ] Dane są poprawne w Admin Panel
- [ ] Struktura JSON jest poprawna
- [ ] Pola JSON są poprawnie wypełnione
- [ ] Statystyki są poprawne

---

## 🚀 CO DALEJ? (Po zakończeniu testów)

### Opcja A: Deploy na Coolify.io
- [ ] Użyj Dockerfile i docker-compose.yml
- [ ] Stwórz aplikację Docker w Coolify.io
- [ ] Zmień URL z localhost na domenę produkcyjną
- [ ] Zaktualizuj connection string w plikach HTML

### Opcja B: Integracja katalogu V2
- [ ] Zmień loadProjects w katalog-v2.html
- [ ] Dodaj PocketBase SDK
- [ ] Zintegruj z PocketBase
- [ ] Testuj katalog z bazą danych

### Opcja C: Własny serwer
- [ ] Skonfiguruj reverse proxy (nginx/caddy)
- [ ] Dodaj SSL certyfikat
- [ ] Ustaw environment variables
- [ ] Uruchom jako service

---

## 📝 NOTATKI

**Poświadczenia:**
- Admin: admin@gildia.pl / Admin123!
- Test 1: test@gildia.pl / Test123!
- Test 2: test2@gildia.pl / Test123!

**Ważne linki:**
- Admin Panel: http://127.0.0.1:8090/_/
- PocketBase API: http://127.0.0.1:8090
- Login: login.html
- Generator: generator-v2-pb.html
- Debug: pocketbase-debug.html

**Pliki główne:**
- setup-pocketbase.md - szczegółowa instrukcja
- test-pocketbase.md - plan testowania
- projekty-v2.json - dane testowe

---

## ⚠️ TROUBLESHOOTING

**PocketBase nie startuje:**
- Sprawdź czy port 8090 jest wolny
- Sprawdź czy firewall nie blokuje
- Spróbuj inną wersję PocketBase

**Błąd migracji:**
- Sprawdź czy kolekcja "projekty" istnieje
- Sprawdź czy pola są poprawnie skonfigurowane
- Sprawdź console w przeglądarce

**Błąd logowania:**
- Sprawdź czy PocketBase działa
- Sprawdź uprawnienia kolekcji "users"
- Sprawdź console w przeglądarce

**Błąd uprawnień:**
- Sprawdź API Rules w Admin Panel
- Sprawdź czy użytkownik jest zalogowany
- Sprawdź czy relacja "author" działa

---

## 🎯 KIEDY WSZYSTKO DZIAŁA

Gdy wszystkie checkboxy są odhaczone:
1. **System jest gotowy do użycia lokalnie**
2. **Możesz testować dodawanie/edycję projektów**
3. **Możesz zapraszać użytkowników do testów**
4. **Możesz planować deploy na Coolify.io**
5. **Możesz integrować katalog V2**

**Czas na następny krok:** Umów się na sesję dla deploy Coolify.io lub integracji katalogu!