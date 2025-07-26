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
  try {
    // Validate request body exists
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        error: "No data provided",
      });
    }

    // Extract and validate item from request body
    const { item } = req.body;

    // Check if item is provided and not empty
    if (!item) {
      return res.status(400).json({
        message: "Item field is required",
        error: "Please provide a todo item",
      });
    }

    // Check if item is a string and not just whitespace
    if (typeof item !== "string" || item.trim().length === 0) {
      return res.status(400).json({
        message: "Item must be a non-empty string",
        error: "Todo item cannot be empty or whitespace only",
      });
    }

    // Create new todo with trimmed item
    const newTodo = await TodoItem.create({
      item: item.trim(),
      completed: false,
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
    // Validate request body exists
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        error: "No data provided",
      });
    }

    // Prepare update object
    const updateData = {};

    // Handle item update
    if (req.body.item !== undefined) {
      const { item } = req.body;

      // Check if item is provided and not empty
      if (!item) {
        return res.status(400).json({
          message: "Item field cannot be empty",
          error: "Please provide a todo item",
        });
      }

      // Check if item is a string and not just whitespace
      if (typeof item !== "string" || item.trim().length === 0) {
        return res.status(400).json({
          message: "Item must be a non-empty string",
          error: "Todo item cannot be empty or whitespace only",
        });
      }

      updateData.item = item.trim();
    }

    // Handle completed status update
    if (req.body.completed !== undefined) {
      updateData.completed = Boolean(req.body.completed);
    }

    // Update todo
    const updatedTodo = await TodoItem.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

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

const toggleTodoCompletion = async (req, res) => {
  const id = req.params.id;

  try {
    const currentTodo = await TodoItem.findById(id);

    if (!currentTodo) {
      return res.status(404).json({
        message: "Todo item not found",
      });
    }

    // Toggle the completed status
    const updatedTodo = await TodoItem.findByIdAndUpdate(
      id,
      { completed: !currentTodo.completed },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: `Todo item ${
        updatedTodo.completed ? "completed" : "marked as pending"
      }`,
      updatedTodo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to toggle todo completion",
      error: error.message,
    });
  }
};
export {
  getTodoItem,
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
  toggleTodoCompletion,
};
