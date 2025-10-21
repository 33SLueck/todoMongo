import todoModel from "../models/todoModel.js";

// POST / CREATE
async function createTodoController(req, res) {
   console.log(req.body.todo);
    const neuTodo = req.body.todo;
    try {
      // Erstelle ein neues Todo-Objekt mit dem Model
      const toSave = todoModel({
        todo: neuTodo,
      });
      // Speichere das Todo-Objekt in der Datenbank mit der Methode `save()`
      await toSave.save();
      // Sende eine Antwort zurück an den Client mit dem Statuscode 201 (Created)
      res.status(201).json({ message: "Todo erfolgreich erstellt" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// GET ALL TASKS
async function getAllTodosController(req, res) {
  try {
    const allTodoItems = await todoModel.find({});
    res.status(200).json(allTodoItems);
  } catch (error) {
    res.json(error);
  }
}

const updateTodoController = async (req, res) => {
  const todoId = req.params.id;
 
   // Hol dir den neuen Todo-Text von der Anfrage
   const newTodoText = req.body;
 
   //
   try {
     await todoModel.findByIdAndUpdate(
       todoId,
       {
         $set: newTodoText,
       },
       { new: true }
     );
      const updatedTodo = await todoModel.findByIdAndUpdate(
        todoId,
        {
          $set: newTodoText,
        },
        { new: true }
      );
 
     // Sende die Todos zurück an den Client mit dem Statuscode 200 (OK)
     //res.status(200).json({ message: "Todo erfolgreich aktualisiert" });
      res.status(200).json(updatedTodo);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
}

const deleteTodoController = async (req, res) => {
  // Hol dir die ID von der URL
  const todoId = req.params.id;
  console.log(todoId);
  try {
    // todo mit `findByIdAndDelete()` löschen
    await todoModel.findByIdAndDelete(todoId);

    // Sende eine Antwort zurück an den Client mit dem Statuscode 200 (OK)
    res.status(200).json({ message: "Todo erfolgreich gelöscht" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllTodosController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
