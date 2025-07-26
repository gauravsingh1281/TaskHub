import mongoose from "mongoose";
const todoItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TodoItem = mongoose.model("TodoItem", todoItemSchema);
export default TodoItem;
