import TodoItem from "../models/todo.models.js";

const getTodoItem = async (req, res) => {
  try {
    const todoItems = await TodoItem.find();
    res.status(200).json({
      message: "Todo items retrieved successfully",
      todoItems: todoItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve todo items",
      error: error.message,
    });
  }
};

const addTodoItem = async (req, res) => {
  const item = req.body.item;
  try {
    const newTodo = await TodoItem.create({
      item,
    });
    res.status(201).json({
      message: "Todo item created successfully",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create todo item",
      error: error.message,
    });
  }
};

const deleteTodoItem = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTodo = await TodoItem.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo item not found",
      });
    }
    res.status(200).json({
      message: `Todo item successfully deleted`,
      deletedTodo: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete todo item",
      error: error.message,
    });
  }
};

const updateTodoItem = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTodo = await TodoItem.findByIdAndUpdate(
      id,
      { item: req.body.item },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo item not found",
      });
    }
    res.status(200).json({
      message: `Todo item successfully updated`,
      updatedTodo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update todo item",
      error: error.message,
    });
  }
};
export { getTodoItem, addTodoItem, deleteTodoItem, updateTodoItem };
