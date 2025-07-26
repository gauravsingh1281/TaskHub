import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiInstance from "../apiInstance";

const TodoListContainer = () => {
  const { register, handleSubmit, reset } = useForm();
  const [todoItem, setTodoItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get("/");
      setTodoItem(response.data.todoItems || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItems = async (data) => {
    try {
      setLoading(true);

      // Reset editing state when adding new todo
      setEditingId(null);
      setEditedText("");

      await apiInstance.post("/", {
        item: data.item,
      });
      reset();
      await fetchTodos();
    } catch (error) {
      console.log("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await apiInstance.delete(`/${id}`);
      await fetchTodos();
    } catch (error) {
      console.log("Error while deleting todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleSave = async (id) => {
    try {
      setLoading(true);
      await apiInstance.patch(`/${id}`, {
        item: editedText,
      });
      setEditingId(null);
      setEditedText("");
      await fetchTodos();
    } catch (error) {
      console.log("Error while updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedText("");
  };

  // Loader
  const Loader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-lime-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-2xl border border-lime-200 max-w-sm w-full">
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-lime-200 rounded-full"></div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-lime-600 rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-700 font-medium text-sm sm:text-base">
          Loading...
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-4 sm:py-8 px-4">
      {loading && <Loader />}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            ✨ Todo App
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg">
            Organize your life, one task at a time
          </p>
        </div>

        {/* Todo Form */}
        <div className="bg-lime-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-2xl border border-lime-200">
          <form
            onSubmit={handleSubmit(addItems)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <input
              type="text"
              placeholder="Add a new task..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-0 outline-none text-gray-800 placeholder-gray-500 shadow-lg focus:ring-4 focus:ring-lime-300 transition-all duration-300 text-base sm:text-lg bg-white"
              {...register("item", { required: true })}
              onFocus={() => {
                // Close editing mode when focusing on add input
                setEditingId(null);
                setEditedText("");
              }}
              onChange={() => {
                // Close editing mode when typing in add input
                if (editingId) {
                  setEditingId(null);
                  setEditedText("");
                }
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-lime-500 to-lime-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:from-lime-600 hover:to-lime-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Task
              </span>
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="space-y-3 sm:space-y-4">
          {todoItem.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                No tasks yet!
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Add your first task to get started
              </p>
            </div>
          ) : (
            todoItem.map((item, index) => (
              <div
                key={item._id}
                className="bg-lime-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-lime-200 hover:bg-lime-50 transition-all duration-300 transform hover:scale-[1.01] sm:hover:scale-[1.02]"
              >
                {editingId === item._id ? (
                  // Edit Mode
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-0 outline-none text-gray-800 shadow-lg focus:ring-4 focus:ring-green-300 transition-all duration-300 bg-white text-sm sm:text-base"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2 sm:gap-3 justify-end sm:justify-start">
                      <button
                        onClick={() => handleSave(item._id)}
                        disabled={loading}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center gap-1 sm:gap-2"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="hidden sm:inline">Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center gap-1 sm:gap-2"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Normal Mode
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-lime-500 to-lime-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-base sm:text-xl text-gray-800 font-medium flex-1 break-words">
                        {item.item}
                      </h3>
                    </div>
                    <div className="flex gap-2 sm:gap-3 justify-end sm:justify-start">
                      <button
                        onClick={() => handleEdit(item._id, item.item)}
                        disabled={loading}
                        className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:from-lime-600 hover:to-lime-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center gap-1 sm:gap-2"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={loading}
                        className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center gap-1 sm:gap-2"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Todo count */}
        {todoItem.length > 0 && (
          <div className="mt-6 sm:mt-8 text-center">
            <div className="bg-lime-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 inline-block border border-lime-200 shadow-lg">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Total Tasks:{" "}
                <span className="text-lime-600 font-bold">
                  {todoItem.length}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoListContainer;
