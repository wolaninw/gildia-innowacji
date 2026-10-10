# PocketBase Setup Guide

## Krok 1: Pobierz PocketBase

### Windows:
1. Wejdź na: https://pocketbase.io/docs/
2. Pobierz odpowiedni plik:
   - `pocketbase_windows_amd64.zip` dla 64-bit
   - `pocketbase_windows_386.zip` dla 32-bit
3. Rozpakuj do folderu `D:\Gildia innowacji\gildia-innowacji-main\pocketbase\`

### Linux/Coolify.io:
```bash
wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.25/pocketbase_linux_amd64.zip
unzip pocketbase_linux_amd64.zip
chmod +x pocketbase
```

## Krok 2: Uruchom PocketBase (lokalnie)

### Windows:
```powershell
cd "D:\Gildia innowacji\gildia-innowacji-main\pocketbase"
.\pocketbase.exe serve
```

### Linux:
```bash
./pocketbase serve
```

PocketBase uruchomi się na: `http://127.0.0.1:8090`

## Krok 3: Dostęp do Admin Panel

1. Otwórz przeglądarkę: `http://127.0.0.1:8090/_/`
2. Stwórz admin konto (pierwsze uruchomienie)
3. Zaloguj się jako admin

## Krok 4: Skonfiguruj kolekcje

### Kolekcja "users" (istnieje domyślnie):
- email (email, required, unique)
- name (text)
- role (select: admin, user)

### Kolekcja "projekty":
- nazwa_projektu (text, required)
- kategoria (select: spoleczne, biznesowe)
- podkategoria (text)
- status (select: koncepcja, backlog, realizacja, prototypowanie, testowanie, wdrozenie, zakonczone)
- omowienie (text)
- pitch (text)
- data_rozpoczecia (date)
- data_zakonczenia (date)
- cele (json)
- specyfikacje (json)
- media (json)
- dokumentacja (url)
- tagi (json)
- author (relation to users)
- created (date, auto)
- updated (date, auto)

### Permissions dla "projekty":
- Create: Only authenticated users
- Read: Public
- Update: Only author or admin
- Delete: Only author or admin

## Krok 5: Integracja Frontend

Dodaj PocketBase SDK do Twojego HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/dist/pocketbase.umd.min.js"></script>
```

## Krok 6: Przykładowy kod logowania

```javascript
// Inicjalizacja
const pb = new PocketBase('http://127.0.0.1:8090');

// Rejestracja
async function register(email, password, name) {
  try {
    const user = await pb.collection('users').create({
      email: email,
      password: password,
      passwordConfirm: password,
      name: name,
      role: 'user'
    });
    console.log('Zarejestrowano:', user);
  } catch (error) {
    console.error('Błąd rejestracji:', error);
  }
}

// Logowanie
async function login(email, password) {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    console.log('Zalogowano:', authData);
    return authData;
  } catch (error) {
    console.error('Błąd logowania:', error);
  }
}

// Wylogowanie
function logout() {
  pb.authStore.clear();
  console.log('Wylogowano');
}

// Sprawdzenie czy zalogowany
function isLoggedIn() {
  return pb.authStore.isValid;
}
```

## Krok 7: Przykładowy CRUD projektów

```javascript
// Dodaj projekt
async function addProject(projectData) {
  try {
    const project = await pb.collection('projekty').create({
      ...projectData,
      author: pb.authStore.model.id
    });
    console.log('Dodano projekt:', project);
    return project;
  } catch (error) {
    console.error('Błąd dodawania:', error);
  }
}

// Pobierz projekty
async function getProjects() {
  try {
    const projects = await pb.collection('projekty').getList(1, 50, {
      sort: '-created'
    });
    return projects.items;
  } catch (error) {
    console.error('Błąd pobierania:', error);
  }
}

// Aktualizuj projekt
async function updateProject(id, projectData) {
  try {
    const project = await pb.collection('projekty').update(id, projectData);
    console.log('Zaktualizowano projekt:', project);
    return project;
  } catch (error) {
    console.error('Błąd aktualizacji:', error);
  }
}

// Usuń projekt
async function deleteProject(id) {
  try {
    await pb.collection('projekty').delete(id);
    console.log('Usunięto projekt');
  } catch (error) {
    console.error('Błąd usuwania:', error);
  }
}
```

## Krok 8: Integracja z Coolify.io

### Dockerfile:
```dockerfile
FROM alpine:latest
WORKDIR /app
COPY pocketbase .
EXPOSE 8090
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
```

### Docker Compose:
```yaml
version: '3.8'
services:
  pocketbase:
    build: .
    ports:
      - "8090:8090"
    volumes:
      - ./pb_data:/app/pb_data
    restart: unless-stopped
```

### Coolify.io setup:
1. Stwórz nową aplikację Docker
2. Użyj powyższego Dockerfile
3. Otwórz port 8090
4. Ustaw environment variables (opcjonalnie)

## Krok 9: Migracja danych

Przenieś dane z `projekty.json` do PocketBase:

```javascript
async function migrateFromJSON() {
  const response = await fetch('projekty.json');
  const projects = await response.json();
  
  for (const project of projects) {
    try {
      await pb.collection('projekty').create(project);
      console.log('Migrated:', project.id);
    } catch (error) {
      console.error('Error migrating:', project.id, error);
    }
  }
}
```

## Krok 10: Bezpieczeństwo

### HTTPS w produkcji:
- Użyj reverse proxy (nginx, caddy)
- Ustaw `POCKETBASE_SERVE_HTTPS=true`
- Dodaj SSL certyfikat

### Permissions:
- Zawsze włącz auth dla write operations
- Użyj Row Level Security w PocketBase
- Regularnie aktualizuj PocketBase