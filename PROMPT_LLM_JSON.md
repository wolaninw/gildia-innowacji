# PROMPT DLA LLM — Generowanie projektów do katalogu Gildii Innowacji

## Twoje zadanie

Wygenerujesz obiekty JSON dla projektów Gildii Innowacji na podstawie danych które podam poniżej.
Każdy projekt to jeden obiekt JSON zgodny ze strukturą poniżej.
Zwróć TYLKO tablicę JSON — bez komentarzy, bez markdown, bez wyjaśnień.

---

## Struktura każdego projektu

```json
{
  "id": "p046",
  "tytul": "Nazwa projektu",
  "kategoria": "spoleczne",
  "podkategoria": "Projekty dla szkoły",
  "pitch": "Pierwsze zdanie — co to jest. Drugie zdanie — po co.",
  "status": "koncepcja",
  "postep": "1. Koncepcja",
  "miejsce": "Kielce",
  "media": {
    "typ": "placeholder",
    "src": ""
  },
  "narzedzia": [
    { "nazwa": "Google Docs", "opis": "Dokumentacja projektu" },
    { "nazwa": "Canva", "opis": "Materiały graficzne" }
  ],
  "wnioski": [
    { "typ": "+",  "tresc": "Co zadziałało" },
    { "typ": "-",  "tresc": "Co nie zadziałało" },
    { "typ": "->", "tresc": "Rekomendacja na przyszłość" }
  ],
  "tagi": ["tag1", "tag2", "tag3"],
  "dokumentacja": "https://docs.google.com/..."
}
```

---

## Zasady które MUSISZ przestrzegać

### Pole `id`
- Format: `"p"` + numer, np. `"p046"`
- Ostatni użyty ID w bazie: **p045** — zaczynaj od p046

### Pole `kategoria` — TYLKO dwie wartości (bez polskich znaków!)
- `"spoleczne"` — projekt angażuje społeczność, bez modelu biznesowego
- `"biznesowe"` — projekt ma model przychodowy lub jest dla firm/instytucji

### Pole `podkategoria` — przepisuj DOKŁADNIE, tylko z tej listy

**Dla `"spoleczne"`:**
- `"Projekty dla szkoły"`
- `"Projekty dla otoczenia"`
- `"Projekty dla innych organizacji"`
- `"Projekty dla kultury"`
- `"Projekty pod media"`
- `"Projekty natury komunikacyjnej"`
- `"Projekty związane z Hobby"`
- `"Projekty DIY"`
- `"Wydarzenia"`
- `"Edukacja i rozwój osobisty"`

**Dla `"biznesowe"`:**
- `"Projekty dla szkoły"`
- `"Projekty dla otoczenia"`
- `"Projekty dla innych organizacji"`
- `"Projekty natury komunikacyjnej"`
- `"Projekty związane z Hobby"`
- `"Projekty DIY"`
- `"Edukacja i rozwój osobisty"`

### Pole `status` i `postep` — zawsze razem

| status | postep |
|---|---|
| `"koncepcja"` | `"1. Koncepcja"` |
| `"backlog"` | `"2. Backlog"` |
| `"realizacja"` | `"3. Realizacja"` |
| `"prototypowanie"` | `"4. Prototypowanie"` |
| `"testowanie"` | `"5. Testowanie"` |
| `"zakonczone"` | `"6. Zakończenie"` |

### Pole `media`
```json
{ "typ": "placeholder", "src": "" }           ← brak zdjęcia (domyślne)
{ "typ": "obraz", "src": "assets/p/foto.jpg" } ← zdjęcie z folderu
{ "typ": "youtube", "src": "ID_FILMU" }        ← samo ID z linku YouTube
{ "typ": "video", "src": "assets/x.mp4" }      ← lokalny plik video
```

### Pole `wnioski` — typy
- `"+"` — co zadziałało
- `"-"` — co nie zadziałało
- `"->"` — rekomendacja na przyszłość

Jeśli projekt jest w trakcie lub brak danych → `"wnioski": []`

### Pole `pitch`
- Dokładnie 2 zdania
- Pierwsze: co to jest
- Drugie: po co / dla kogo / jaki efekt
- Max 200 znaków łącznie

### Pole `tagi`
- 2–5 słów
- Małe litery
- Po polsku
- Bez przecinków wewnątrz tagu

### Pole `dokumentacja`
- Link do Google Docs jeśli istnieje
- Jeśli brak: `""`

### Pole `narzedzia`
- Lista narzędzi użytych w projekcie
- Jeśli brak danych: `"narzedzia": []`

---

## Format odpowiedzi

Zwróć WYŁĄCZNIE tablicę JSON gotową do wklejenia do pliku projekty.json:

```json
[
  { ...projekt 1... },
  { ...projekt 2... }
]
```

Bez żadnego tekstu przed ani po. Bez markdown. Bez komentarzy w JSON.

---

## DANE PROJEKTÓW DO PRZETWORZENIA

Wklej tutaj dane projektów w dowolnej formie (tekst, tabelka, opis).
LLM przetworzy je na poprawny JSON według powyższych zasad.

```
[WKLEJ DANE PROJEKTÓW TUTAJ]
```

---

## Przykład użycia

**Wejście:**
```
Projekt: Festiwal Kultury Kieleckiej
Opis: Coroczny festiwal prezentujący lokalne talenty — muzyka, taniec, sztuka.
Miejsce: Kielce centrum
Status: koncepcja
Narzędzia: Canva, FB Events
```

**Oczekiwane wyjście:**
```json
[
  {
    "id": "p046",
    "tytul": "Festiwal Kultury Kieleckiej",
    "kategoria": "spoleczne",
    "podkategoria": "Projekty dla kultury",
    "pitch": "Coroczny festiwal prezentujący lokalne talenty — muzyka, taniec i sztuka. Projekt buduje tożsamość kulturalną Kielc i angażuje lokalnych twórców.",
    "status": "koncepcja",
    "postep": "1. Koncepcja",
    "miejsce": "Kielce centrum",
    "media": { "typ": "placeholder", "src": "" },
    "narzedzia": [
      { "nazwa": "Canva", "opis": "Plakaty i materiały promocyjne" },
      { "nazwa": "Facebook Events", "opis": "Promocja i komunikacja" }
    ],
    "wnioski": [],
    "tagi": ["festiwal", "kultura", "Kielce", "muzyka", "sztuka"],
    "dokumentacja": ""
  }
]
```
