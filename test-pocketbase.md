# Plan Testowania PocketBase

## 🧪 Faza 1: Uruchomienie lokalne

### 1.1 Pobierz i uruchom PocketBase
```powershell
cd "D:\Gildia innowacji\gildia-innowacji-main"
mkdir pocketbase
cd pocketbase
# Pobierz z https://pocketbase.io/docs/ 
# Wybierz pocketbase_windows_amd64.zip
.\pocketbase.exe serve
```

**Oczekiwany wynik:** PocketBase uruchomiony na `http://127.0.0.1:8090`

### 1.2 Dostęp do Admin Panel
1. Otwórz: `http://127.0.0.1:8090/_/`
2. Stwórz admin konto:
   - Email: `admin@gildia.pl`
   - Hasło: `Admin123!`
3. Zaloguj się

**Oczekiwany wynik:** Dostęp do Admin Panel

### 1.3 Konfiguracja kolekcji "users" (już istnieje)
- Sprawdź czy pola są OK:
  - email (email, required, unique)
  - name (text)
  - role (select: admin, user)

### 1.4 Konfiguracja kolekcji "projekty"
W Admin Panel:
1. Kliknij "New Collection"
2. Nazwa: `projekty`
3. Pola:
   - `nazwa_projektu` (text, required)
   - `kategoria` (select: spoleczne, biznesowe)
   - `podkategoria` (text)
   - `status` (select: koncepcja, backlog, realizacja, prototypowanie, testowanie, wdrozenie, zakonczone)
   - `omowienie` (text)
   - `pitch` (text)
   - `data_rozpoczecia` (date)
   - `data_zakonczenia` (date)
   - `cele` (json)
   - `specyfikacje` (json)
   - `media` (json)
   - `dokumentacja` (url)
   - `tagi` (json)
   - `author` (relation to users)

4. Permissions:
   - Create: Only authenticated users
   - Read: Public
   - Update: Only author or admin
   - Delete: Only author or admin

**Oczekiwany wynik:** Kolekcja "projekty" skonfigurowana

---

## 📥 Faza 2: Migracja danych

### 2.1 Migracja 8 przykładowych projektów
1. Otwórz: `migrate-to-pocketbase.html`
2. Postępuj zgodnie z instrukcją
3. Kliknij "🚀 Rozpocznij migrację"

**Oczekiwany wynik:** 8 projektów przeniesionych do PocketBase

### 2.2 Weryfikacja w Admin Panel
1. W Admin Panel kliknij na kolekcję "projekty"
2. Sprawdź czy 8 projektów jest widocznych
3. Sprawdź czy dane są poprawne

**Oczekiwany wynik:** 8 projektów w Admin Panel

---

## 🔐 Faza 3: Test logowania

### 3.1 Rejestracja użytkownika
1. Otwórz: `login.html`
2. Kliknij "Nie masz konta? Zarejestruj się"
3. Wypełnij formularz:
   - Email: `test@gildia.pl`
   - Hasło: `Test123!`
   - Imię: `Test User`
4. Kliknij "Zarejestruj się"

**Oczekiwany wynik:** Komunikat "Zarejestrowano pomyślnie!"

### 3.2 Logowanie
1. Wypełnij formularz:
   - Email: `test@gildia.pl`
   - Hasło: `Test123!`
2. Kliknij "Zaloguj się"

**Oczekiwany wynik:** Przekierowanie do generatora

### 3.3 Sprawdzenie w Admin Panel
1. W Admin Panel kliknij na kolekcję "users"
2. Sprawdź czy użytkownik jest widoczny
3. Sprawdź jego role

**Oczekiwany wynik:** Użytkownik widoczny w Admin Panel

---

## 🛠️ Faza 4: Test generatora

### 4.1 Otwórz generator z autoryzacją
1. Zalogowany użytkownik powinien być w: `generator-v2-pb.html`
2. Sprawdź czy widoczne jest imię użytkownika

**Oczekiwany wynik:** Generator z nazwą użytkownika

### 4.2 Przeglądanie projektów
1. Sprawdź czy 8 projektów jest widocznych na liście
2. Sprawdź picker projektów
3. Kliknij na projekt aby zobaczyć szczegóły

**Oczekiwany wynik:** 8 projektów widocznych, picker działa

### 4.3 Dodanie nowego projektu
1. Kliknij "+ Nowy projekt"
2. Wypełnij podstawowe informacje:
   - Nazwa: "Testowy projekt"
   - Kategoria: "Społeczne"
   - Podkategoria: "Testy"
   - Status: "Koncepcja"
   - Pitch: "Testowy projekt"
3. Kliknij "💾 Zapisz projekt"

**Oczekiwany wynik:** Projekt zapisany, widoczny na liście

### 4.4 Edycja projektu
1. Wybierz "Kiermasz zabawek" z pickera
2. Zmień nazwę na "Kiermasz zabawek - zaktualizowany"
3. Kliknij "💾 Zapisz projekt"

**Oczekiwany wynik:** Projekt zaktualizowany

### 4.5 Przyciski akcji
1. W modalu projektu sprawdź przyciski:
   - "🤝 Dołącz do projektu"
   - "📄 Dokumentacja" (jeśli istnieje)

**Oczekiwany wynik:** Przyciski działają

---

## 👥 Faza 5: Test wielu użytkowników

### 5.1 Rejestracja drugiego użytkownika
1. Wyloguj się (kliknij "🚪 Wyloguj")
2. Zarejestruj drugiego użytkownika:
   - Email: `test2@gildia.pl`
   - Hasło: `Test123!`
   - Imię: "Test User 2"

**Oczekiwany wynik:** Drugi użytkownik zarejestrowany

### 5.2 Sprawdzenie uprawnień
1. Zaloguj jako `test@gildia.pl`
2. Edytuj "Testowy projekt"
3. Zapisz
4. Wyloguj się
5. Zaloguj jako `test2@gildia.pl`
6. Spróbuj edytować "Testowy projekt"

**Oczekiwany wynik:** `test2@gildia.pl` nie może edytować projektu `test@gildia.pl`

### 5.3 Admin uprawnienia
1. W Admin Panel ustaw użytkownika `test@gildia.pl` jako admin
2. Zaloguj jako admin
3. Spróbuj edytować projekt `test2@gildia.pl`

**Oczekiwany wynik:** Admin może edytować wszystkie projekty

---

## 📊 Faza 6: Uzupełnienie danych

### 6.1 Dodanie projektów testowych
Dodaj kilka projektów testowych z różnymi:
- Kategoriami (społeczne, biznesowe)
- Statusami (wszystkie 7 opcji)
- Mediami (zdjęcia, YouTube, linki)
- Dokumentacją (z i bez)

**Oczekiwany wynik:** 10-15 projektów w bazie

### 6.2 Testowania różnych sekcji
Wypełnij wszystkie sekcje projektu:
- Informacje podstawowe ✅
- Cele projektu ✅
- Specyfikacje ✅
- Media ✅
- Dokumentacja ✅
- Tagi ✅

**Oczekiwany wynik:** Wszystkie sekcje działają

### 6.3 Test picker
Sprawdź czy picker aktualizuje się:
- Po dodaniu nowego projektu
- Po edycji projektu
- Po usunięciu projektu

**Oczekiwany wynik:** Picker zawsze aktualny

---

## ✅ Faza 7: Weryfikacja końcowa

### 7.1 Sprawdzenie Admin Panel
1. Liczba użytkowników
2. Liczba projektów
3. Poprawność danych
4. Struktura JSON

**Oczekiwany wynik:** Wszystko poprawne

### 7.2 Test wydajności
1. Czas ładowania projektów
2. Czas zapisu projektu
3. Czas edycji projektu

**Oczekiwany wynik:** Czas akceptowalny (<2s)

### 7.3 Test błędów
1. Spróbuj zarejestrować ten sam email
2. Spróbuj zalogować złym hasłem
3. Spróbuj edytować projekt bez autoryzacji

**Oczekiwany wynik:** Komunikaty błędów poprawne

---

## 📝 Checklista końcowa

- [ ] PocketBase uruchomiony lokalnie
- [ ] Admin Panel dostępny
- [ ] Kolekcja "projekty" skonfigurowana
- [ ] 8 projektów zmigrowanych
- [ ] Logowanie działa
- [ ] Rejestracja działa
- [ ] Generator z autoryzacją działa
- [ ] CRUD projektów działa
- [ ] Picker projektów działa
- [ ] Uprawnienia działają
- [ ] Admin panel działa
- [ ] Dane są poprawne
- [ ] Wydajność jest OK
- [ ] Błędy są poprawnie obsługiwane

---

## 🚀 Kiedy wszystko działa:

Gdy wszystkie testy przejdą pomyślnie, możesz:
1. Przejść do deploy na Coolify.io
2. Zintegrować katalog V2 z PocketBase
3. Zmienić URL z localhost na domenę produkcyjną