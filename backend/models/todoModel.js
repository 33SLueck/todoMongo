// 1. Mongoose Import
// 2. Schema erstellen
// 3. Model erstellen
// 4. Exportier den Model
import mongoose from "mongoose";

// 2. Schema erstellen
// Schema ist ein Muster für jeden Eintrag in der Datenbank
const todoItemSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
});

// 3. Model erstellen
const todoModel = mongoose.model("todoLists", todoItemSchema);

// 4. Exportier den Model
export default todoModel;
