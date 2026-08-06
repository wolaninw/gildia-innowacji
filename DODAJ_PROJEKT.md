# Jak dodać projekt do Gildii Innowacji

Edytujesz plik `projekty.json`. Dopisujesz nowy obiekt na końcu listy (przed ostatnim `]`), zwiększając `id` o 1.

## Szablon

```json
{
  "id": "p045",
  "tytul": "Nazwa projektu",
  "kategoria": "spoleczne",
  "podkategoria": "Projekty dla szkoły",
  "pitch": "Jedno lub dwa zdania — co to jest i po co.",
  "status": "koncepcja",
  "postep": "1. Koncepcja",
  "miejsce": "Kielce",
  "media": { "typ": "placeholder" },
  "narzedzia": [
    { "nazwa": "Google Docs", "opis": "Dokumentacja projektu" },
    { "nazwa": "Canva", "opis": "Plakat i materiały" }
  ],
  "wnioski": [
    { "typ": "+", "tresc": "Co zadziałało" },
    { "typ": "-", "tresc": "Co nie zadziałało" },
    { "typ": "->", "tresc": "Rekomendacja na przyszłość" }
  ],
  "tagi": ["tag1", "tag2"],
  "dokumentacja": "https://docs.google.com/..."
}
```

---

## Pole `kategoria` — tylko dwie wartości

| Wartość | Kiedy |
|---|---|
| `"spoleczne"` | Projekt angażuje społeczność, bez modelu biznesowego |
| `"biznesowe"` | Projekt ma model przychodowy lub jest skierowany do firm/instytucji |

**Uwaga:** bez polskich znaków — `"spoleczne"` nie `"społeczne"`.

---

## Pole `podkategoria` — przepisuj dokładnie

### Dla `"spoleczne"`:
- `"Projekty dla szkoły"`
- `"Projekty dla otoczenia"`
- `"Projekty dla innych organizacji"`
- `"Projekty dla kultury"`
- `"Projekty pod media"`
- `"Projekty natury komunikacyjnej"`
- `"Projekty związane z Hobby"`
- `"Wydarzenia"`
- `"Edukacja i rozwój osobisty"`

### Dla `"biznesowe"`:
- `"Projekty dla szkoły"`
- `"Projekty dla otoczenia"`
- `"Projekty dla innych organizacji"`
- `"Projekty natury komunikacyjnej"`
- `"Projekty związane z Hobby"`
- `"Projekty DIY"`
- `"Edukacja i rozwój osobisty"`

---

## Pole `status` i `postep`

| `status` | `postep` |
|---|---|
| `"koncepcja"` | `"1. Koncepcja"` |
| `"backlog"` | `"2. Backlog"` |
| `"realizacja"` | `"3. Realizacja"` |
| `"prototypowanie"` | `"4. Prototypowanie"` |
| `"testowanie"` | `"5. Testowanie"` |
| `"zakonczone"` | `"6. Zakończenie"` |

---

## Pole `media`

```json
{ "typ": "placeholder" }
{ "typ": "obraz", "src": "assets/projekty/zdjecie.jpg" }
{ "typ": "youtube", "src": "ID_FILMU" }
```

---

## Pole `wnioski` — typy wpisów

| `typ` | Znaczenie | Kolor na stronie |
|---|---|---|
| `"+"` | Co zadziałało | zielony |
| `"-"` | Co nie zadziałało | pomarańczowy |
| `"->"` | Rekomendacja | niebieski |

Jeśli projekt jest w trakcie — zostaw `"wnioski": []`.

---

## Zasady

- `id` — zawsze `"p"` + numer, np. `"p045"`. Sprawdź ostatni `id` w pliku i dodaj 1.
- `pitch` — max 2 zdania, konkretne, bez lania wody.
- `tagi` — 2–5 słów, małymi literami, po polsku.
- `dokumentacja` — link do Google Docs jeśli istnieje, jeśli nie: `""`.
- Nie zmieniaj istniejących projektów bez wyraźnej prośby.
- Nie dodawaj nowych podkategorii — używaj tylko tych z listy powyżej.
