# 📝 TaskHub

A modern, full-stack Todo application built with React.js and Node.js, featuring a beautiful UI, robust API, and comprehensive testing suite.

## ✨ Features

## 🛠️ Tech Stack

### **Frontend**

- **React.js 18+** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **React Toastify** - Toast notifications
- **Axios** - HTTP client

### **Backend**

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
taskHub/
├── client/                     # React frontend
│   ├── src/
│   │   ├── component/
│   │   │   └── TodoListContainer.jsx
│   │   ├── apiInstance.js      # Axios configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # Database connection
│   │   ├── controllers/
│   │   │   └── todo.controllers.js
│   │   ├── models/
│   │   │   └── todo.models.js
│   │   ├── routes/
│   │   │   └── todo.routes.js
│   │   └── app.js             # Express app configuration
│   ├── server.js              # Server entry point
│   └── package.json
├── postman/                   # API testing
│   ├── TaskHub_API.postman_collection.json
│   ├── TaskHub_Environment.postman_environment.json
│   └── README.md
├── API_DOCUMENTATION.md       # Complete API docs
└── README.md                 # This file
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gauravsingh1281/TaskHub.git
   cd TaskHub
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**

   Create `.env` file in the `server` directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskhub
   CORS_ORIGIN=http://localhost:5173
   ```

   Create `.env` file in the `client` directory:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

### 🏃‍♂️ Running the Application

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

2. **Start Backend Server**

   ```bash
   cd server
   npm start
   ```

   Server will run on `http://localhost:3000`

3. **Start Frontend Development Server**

   ```bash
   cd client
   npm run dev
   ```

   Client will run on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## 📖 API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method   | Endpoint | Description     | Body                       |
| -------- | -------- | --------------- | -------------------------- |
| `GET`    | `/`      | Get all todos   | None                       |
| `POST`   | `/`      | Create new todo | `{"item": "Todo text"}`    |
| `PATCH`  | `/:id`   | Update todo     | `{"item": "Updated text"}` |
| `DELETE` | `/:id`   | Delete todo     | None                       |

### Example Requests

#### Create Todo

```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{"item": "Learn React.js"}'
```

#### Get All Todos

```bash
curl -X GET http://localhost:3000/
```

#### Update Todo

```bash
curl -X PATCH http://localhost:3000/TODO_ID \
  -H "Content-Type: application/json" \
  -d '{"item": "Learn Advanced React.js"}'
```

#### Delete Todo

```bash
curl -X DELETE http://localhost:3000/TODO_ID
```

## 👨‍💻 Author

**Gaurav Singh**

- GitHub: [@gauravsingh1281](https://github.com/gauravsingh1281)
- Project: [TaskHub](https://github.com/gauravsingh1281/TaskHub)

## 📸 Screenshots

### Main Interface

![TaskHub Main Interface](placeholder-for-main-interface-screenshot)

### Mobile View

![TaskHub Mobile View](placeholder-for-mobile-screenshot)

### Add Todo

![Add Todo Feature](placeholder-for-add-todo-screenshot)

### Edit Mode

![Edit Todo Feature](placeholder-for-edit-mode-screenshot)

---

⭐ **Star this repository if you found it helpful!**

🐛 **Found a bug or want to contribute?** [Open an issue](https://github.com/gauravsingh1281/TaskHub/issues)

📧 **Questions?** Feel free to reach out via GitHub issues or discussions.
