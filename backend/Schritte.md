# TODO-SERVER(API) - BACKEND (MIT EXPRESS, MONGOOSE & MONGODB) Teil 1

- In diesem Einführungsprojekt werden wir eine einfache TODO-API erstellen die
  - CRUD-Funktionalität (Create, Read, Update, Delete) bietet.
  - mit MongoDB und Mongoose arbeitet
  - die MVC-Architektur verwendet (MVC = Model-View-Controller)

---

## PLAN

- Ein Projekt zu planen ist sehr wichtig, um den Überblick zu behalten.
- Hier ist ein einfacher Plan für unser Projekt:
- Wir werden eine TODO-Liste erstellen, die folgende Funktionen hat:
  - Alle Aufgaben anzeigen (READ)
  - Eine neue Aufgabe erstellen (CREATE)
  - Eine Aufgabe aktualisieren (UPDATE)
  - Eine Aufgabe löschen (DELETE)
- Die Client kann diese API anwenden, um:
  - Aufgaben zu erstellen (CREATE)
  - Aufgaben zu löschen (DELETE)
  - Aufgaben zu aktualisieren (UPDATE)
  - Alle Aufgaben anzuzeigen (READ)

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
npm install dotenv
npm install mongoose

// ODER (IN BEAST-MODUS): alle auf einmal installieren 🧑🏿‍💻
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
import "dotenv/config";
```

<br>

8. `.env` configuration durchführen

- .env datei erstellen und PortNummer hinzufügen

```txt
PORTNUMMER=5080
```

<br>

9. `app` Variabel mit `express()` declarieren

```js
const app = express();
```

<br>

10. `port` Variabel declarieren

```js
const port = process.env.PORTNUMMER || 5082; // oder ein beliebiger Port
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

**MIT THUNDER-CLIENT Extension TESTEN !!!**

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

- Trennung der Verantwortlichkeiten (Separation of concerns):
  - Jeder Teil hat eine klare Aufgabe, was den Code sauber und wartbar macht.
- Einfachere Zusammenarbeit:
  - Entwickler können an verschiedenen Teilen (Model, View, Controller) arbeiten, ohne sich gegenseitig zu stören.
- Flexibilität:
  - Änderungen in einem Bereich (z. B. Datenbank) beeinflussen die anderen Bereiche weniger.

## Kurz gesagt:

- Model: Arbeitet mit den Daten.
- View: Zeigt die Daten an.
- Controller: Verbindet beide und steuert den Ablauf.

### Erstell die benötigte Ordern

- Ordnern laut unser Plan erstellen

- **models**: Beinhaltet alle Modelle (Schema)
- **controllers**: Beinhaltet alle Controller Funktionen
- **routes**: Beinhaltet alle Router
- **database( oder db)**: Beinhaltet alle Datenbank Verbindung
- **middleware**: Beinhaltet alle Middleware Funktionen (optional)

- **🧑🏿‍💻 BEAST MODUS!** ein Commando in Terminal geht's so:

```js
mkdir models controllers routes database middleware

```

---

### `.env-Datei`, `node_modules` und `.gitignore`

14. erstell ein `.gitignore Datei`
15. füge die `.env` und `node_modules` order in `.gitignore` ein.

```js
// .gitignore Datei

node_modules.env;
```

---

## In Controller Ordner

16. estell ein `todoControllers.js` datei
17. füge ein Funktion ein
18. exportier die Funktion

```js
function getAllTodosController(req, res) {
  res.send("Hallo von GET");
}

export { getAllTodosController };
```

---

## In Routes Ordner

20. estell ein `todoRouter.js` datei
21. importiere express
22. importiere alle controller funktionen
23. deklariere ein `todoRouter` Variabeln aus `express.Router()`
24. erstell die verschiedene Endpunkte mit passenden controller Funktionen
25. exportier die Router als `Default Export`

```js
import express from "express";

import { getAllTodosController } from "../controllers/todoControllers.js";

const todoRouter = express.Router();

// get / read
todoRouter.get("/", getAllTodosController);

export default todoRouter;
```

---

## In `server.js`

26. importiere todoRouter.js

```js
import todoRouter from "./routes/todoRouter.js";
```

27. nutze `app.use()` und gib `dem Pfad`als erster Argument

28. füge `den todoRouter` ein
    - natürlich unter app.get("/")
    - also vor der `app.listen()` Funktion

```js
app.use("/todos", todoRouter);
```

29. Test nochmal ob alles funktioniert

---

## MongoDB und database Ordner

### in `database` Ordner

30. erstell ein `connectDB.js`-Datei in database Ordner

31. importiere mongoose

32. füge eine `connectDB` Funktion ein

33. exportiere der Funktion als Default

```js
import mongoose from "mongoose";

// diese Funktion verwendet mongoose.connect um eine Verbindung zur MongoDB herzustellen
const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
```

### in `.env` datei

34. füge ein PORT variable ein
35. füge dein mongoDB connection URL ein

```js
PORT = 5050 // oder ein beliebiger Port


MONGO_URL = mongodb+srv://DEINUSERNAME:PASSWORT@BLABLABLA.mongodb.net/DATENBANKNAME
```

- in deine MONGO_URL musst du dein Username, Passwort und Datenbankname einfügen
- du kannst die gleicher Username und Passwort für alle deine Projekte verwenden ABER nür die DATENBANKNAME ändern
- zum Beispiel für dein Projekt `todoApi` kannst du `todoApi` als Datenbankname verwenden
- MongoDB erstellt automatisch die Datenbank wenn du deine erste Daten einfügst
- Wenn du eine anderes Projekt hast, kopiere einfach die gleiche MONGO_URL und ändere nur die Datenbankname
- zum Beispiel `eshopApi` kannst du `eshopApi` als Datenbankname verwenden

### in server.js

36. importiere connectDB
37. (Wenn noch nicht vorhanden)füge den Port mit `process.env.PORT` in dein port Variabel ein
38. erstell ein async startServer Funktion (ersetze die alte app.listen() Funktion)
39. füge deine MONGO_URL ein
40. rufe die startServer Funktion

```js
import connectDB from "./database/connectDB.js";
//
const port = process.env.PORT || 5060;
//....

// Ganz unten in der Datei
// diese Funktion verbindet sich mit der MongoDB und startet den Server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Verbindung mit MongoDB hat geklappt");
    app.listen(port, () => {
      console.log("Server läuft auf: ", port);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
```

41. Testen!

- server starten

```bash

npm run start
```

- wenn alles geklappt hat, sollte die Console folgendes ausgeben:

```txt
verbindung mit MONGODB hat geklaptt!
Port läuft auf Port: 5050
```

---

## Model Ordner

- Wie wir gestern gelernt haben, Datenbank brauchen software um mit den Daten zu arbeiten
- Mongoose ist eine ODM (Object Data Modeling) Bibliothek für MongoDB und Node.js, die eine Schema-basierte Lösung für die Datenmodellierung bietet.
- Mongoose bietet eine einfache Möglichkeit,
  - Schemas zu definieren
  - Daten zu validieren
- Ein `Schema` ist eine Struktur, die beschreibt, wie die Daten in der Datenbank aussehen sollen.
  - Syntax:
    - `new mongoose.Schema()`;
    - akzeptiert ein Objekt, das die Struktur der Daten beschreibt.
    - z.B. `{ name: { type: String, required: true } }`
    - `name` ist der Name des Feldes
    - `type` ist der Datentyp (z.B. String, Number, Date)
    - `required` ist eine Validierungsregel, die angibt, ob das Feld erforderlich ist oder nicht.
  - Für unser Projekt werden wir ein einfaches Schema für unsere TODO-Liste erstellen.
  - Das Schema wird ein Feld namens `todo` haben, das vom Typ `String` ist und erforderlich ist.
  - Das bedeutet, dass wir sicherstellen wollen, dass jede Aufgabe einen Namen hat.
  - z.B `{ todo: { type: String, required: true } }`
  - mit schema - `const TodoItemSchema = new mongoose.Schema({ todo: { type: String, required: true } });`
- Ein `Model` ist eine Instanz des Schemas, die mit der Datenbank kommuniziert.
  - syntax:
    - `mongoose.model("ModelName", schema)`
    - `ModelName` ist der Name des Modells(collection in Mongo Datenbank - immer mehrzahlig) (z.B. "todoLists", "users")
    - `schema` ist das Schema, das wir zuvor definiert haben.

## in `models` Ordner

42. erstell ein `todoModel.js`-Datei
1.  Importiere mongoose
1.  estell ein Schema
1.  deklariere ein Model
1.  exportiere den Model

```js
import mongoose from "mongoose";

const TodoItemSchema = new mongoose.Schema({
  todo: { type: String, required: true },
});

const todoModel = mongoose.model("todoLists", TodoItemSchema);

export default todoModel;
```

---

## in `todoControllers`-Datei

- die kontroller sind die Funktionen, die die Logik für die verschiedenen Endpunkte enthalten.
- wir brauchen hier unser Model um mit der Datenbank zu kommunizieren.
- wir werden die CRUD-Funktionen erstellen, die wir in der Tabelle oben erwähnt haben.

46. `todoModel` importieren

```js
import todoModel from "../models/todoModel.js";
```

47. `CRUD`-Funktionen bei bedarf erstellen und exportieren

```js
function getAllTodosController(req, res) {
  res.send("Hallo von GET");
}

function createTodoController(req, res) {
  res.send("Hallo von POST");
}

function updateTodoController(req, res) {
  res.send("Hallo von PUT");
}

function deleteTodoController(req, res) {
  res.send("Hallo von DELETE");
}

function deleteAllTodosController(req, res) {
  res.send("Hallo von DELETE ALL");
}

export {
  getAllTodosController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
  deleteAllTodosController,
};
```

## in `todoRouter`-Datei

48. restliche `Kontroller-Funktionen` importieren
49. passende Router Endpunkte erstellen

```js
import express from "express";

import {
  getAllTodosController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
  deleteAllTodosController,
} from "../controllers/todoControllers.js";

const todoRouter = express.Router();

// get / read
todoRouter.get("/", getAllTodosController);

// create / post
todoRouter.post("/", createTodoController);

//update
todoRouter.put("/:todoId", updateTodoController);

// Delete one
todoRouter.delete("/:todoId", deleteTodoController);

// delete all (OPTIONAL und NICHT WÜNSCHENSWERT)
todoRouter.delete("/", deleteAllTodosController);

export default todoRouter;
```

50. ALLE ENDPUNKTE TESTEN!!!!!!

## Erweiterungen (in ILP-Phase)

- in die beigefügten Dateien gibt's ein "VOLLKONTROLLERS.js"-Datei die alle CRUD-Funktionen mit Mongoose implementiert sind.
- Versuche die Funktionen zu verstehen und in dein Projekt (in die `todoControllers.js`-Datei) zu integrieren.

---
