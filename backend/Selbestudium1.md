# 10.04.2025 - TODO-SERVER(API) - BACKEND (MIT EXPRESS, MONGOOSE & MONGODB) Teil 1

- In diesem Einführungsprojekt werden wir eine einfache TODO-API erstellen die
  - CRUD-Funktionalität (Create, Read, Update, Delete) bietet.
  - mit MongoDB und Mongoose arbeitet
  - die MVC-Architektur verwendet (MVC = Model-View-Controller)

---

## PLAN

- Ein Projekt zu plannen ist sehr wichtig, um den Überblick zu behalten.
- Hier ist ein einfacher Plan für unser Projekt:
- Wir werden eine TODO-Liste erstellen, die folgende Funktionen hat:
  - Alle Aufgaben anzeigen
  - Eine neue Aufgabe erstellen
  - Eine Aufgabe aktualisieren
  - Eine Aufgabe löschen
- Die Client can kann diese API Anwenden Um
  - Aufgaben zu erstellen
  - Aufgaben zu löschen
  - Aufgaben zu aktualisieren
  - Alle Aufgaben anzuzeigen

### 1. Ordnerstruktur

- Die Projektstruktur (Ordnerstruktur) sollte etwa so aussehen:

```
projekt-wurzel(root)/
│
├── .env
│
|
|── .gitignore
|
│
|── controllers/
│     ├── todoController.js
│
│
|── db/
│     ├── connectDB.js
│
│
│
├── models/
│     ├── todoModel.js
│
│
├── models/
│     ├── todoModel.js
│
|
├── routes/
│     ├── todoRoutes.js
|
│
│
└── server.js
```

### 2. Endpunkte

| Endpunkt     | Methode | Beschreibung           | mögliche Funktionsnamen |
| ------------ | ------- | ---------------------- | ----------------------- |
| `/todos`     | GET     | Alle Aufgaben anzeigen | `getAllTodosController` |
| `/todos`     | POST    | Neue Aufgabe erstellen | `createTodoController`  |
| `/todos/:id` | PUT     | Aufgabe aktualisieren  | `updateTodoController`  |
| `/todos/:id` | DELETE  | Aufgabe löschen        | `deleteTodoController`  |

---

### 3. Tech Stack

- **Node.js**: JavaScript-Laufzeitumgebung, die es ermöglicht, JavaScript auf dem Server auszuführen.
- **Express.js**: Web-Framework für Node.js, das die Entwicklung von Webanwendungen und APIs erleichtert.
- **MongoDB**: NoSQL-Datenbank, die JSON-ähnliche Dokumente speichert.
- **Mongoose**: ODM (Object Data Modeling) Bibliothek für MongoDB und Node.js, die eine Schema-basierte Lösung für die Datenmodellierung bietet.
- **Nodemon**: Ein Tool, das automatisch den Node.js-Server neu startet, wenn Änderungen an den Dateien vorgenommen werden.

## Set-up

1. Server Datei (`server.js`) erstellen

   - In unserem Ordner erstellen wir eine Datei namens `server.js` (manchmal ist auch `app.js` oder `index.js` verwendet)

<br>

2. Node inizialisieren: Node in dein Projekt Ordner inizialisieren mit:

```js
npm init -y
```

<br>

3. Packages installieren:

- In unserem Fall haben wir 2 Kategorien Packages zu installieren:
  - 1 x normale Dependency
  - 1 x dev Dependency

```js
// normale Dependency
npm install express
npm install cors
npm install mongoose

// ODER IN BEAST-MODUS: alle auf einmal installieren 🧑🏿‍💻
// npm install express cors dotenv mongoose
```

```js
// dev Dependency
npm install --save-dev nodemon
```

<br>

4. `"type": "module"` in der package.json einfügen

- um ES6 import statements zu verwenden zu können

```json
{
  //...
  "type": "module"
  //...
}
```

5. Scripts in `package.json` bearbeiten:

```json
// in package.json
{
  //...
  "scripts": {
    // diese Zeile sagt wenn wir "npm run start" eingeben, dann soll nodemon server.js ausgeführt werden
    "start": "nodemon server.js"
  }
  //...
}
```

<br>

---

## Code Schreiben

### In `server.js` arbeiten

7. Nötigen Packages importieren

```js
import express from "express";
import cors from "cors";
```

<br>

8. `.env` configuration durchführen

- .env datei erstellen und PortNummer hinzufügen

```txt
PORTNUMMER=5050
```

<br>

9. `app` Variabel mit `express()` declarieren

```js
const app = express();
```

<br>

10. `port` Variabel declarieren

```js
const port = process.env.PORTNUMMER || 5080; // oder ein beliebiger Port
```

<br>

11. Probe endpunkte erstellen

```js
app.get("/", (req, res) => {
  res.send("Hallo von HOME!");
});
```

<br>

12. Listen Port Funktion am Ende deklarieren

```js
app.listen(port, () => {
  console.log("Server läuft auf: ", port);
});
```

<br>

13. Server starten

```js
npm run start
```

**MIT THUNDER TESTEN !!!**

---

## MVC Ordnerstruktur

- MVC steht für Model-View-Controller und ist ein Architekturmuster, das hilft, den Code einer Anwendung sauber und organisiert zu halten.
- Es teilt die Anwendung in drei Hauptbereiche:

### 1. Model (Daten und Logik)

- Was es macht:
  - Verarbeitet und speichert die Daten.
  - Kommuniziert mit der Datenbank.
  - Enthält die Geschäftslogik (z. B. Regeln, wie Daten verarbeitet werden).
- Beispiel:
  - Ein todoModel speichert die Struktur einer Aufgabe (z. B. todo: String).

### 2. View (Benutzeroberfläche)

- Was es macht:
  - Zeigt die Daten dem Benutzer an.
  - Nimmt Eingaben vom Benutzer entgegen.
- Beispiel:
  - Eine Webseite oder API-Antwort, die eine Liste von Aufgaben anzeigt.

### 3. Controller (Steuerung)

- Was es macht:
  - Verbindet das Model und die View.
  - Nimmt Benutzeranfragen entgegen, verarbeitet sie und gibt die Antwort zurück.
  - Ruft Funktionen im Model auf und liefert die Ergebnisse an die View.
- Beispiel:
  - Ein getAllTodosController, der alle Aufgaben aus der Datenbank holt und an die View sendet.

## Warum MVC?

- Trennung der Verantwortlichkeiten:
  - Jeder Teil hat eine klare Aufgabe, was den Code sauber und wartbar macht.
- Einfachere Zusammenarbeit:
  - Entwickler können an verschiedenen Teilen (Model, View, Controller) arbeiten, ohne sich gegenseitig zu stören.
- Flexibilität:
  - Änderungen in einem Bereich (z. B. Datenbank) beeinflussen die anderen Bereiche weniger.

## Kurz gesagt:

- Model: Arbeitet mit den Daten.
- View: Zeigt die Daten an.
- Controller: Verbindet beide und steuert den Ablauf.
