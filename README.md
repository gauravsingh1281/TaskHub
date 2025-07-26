# 📝 **TaskHub**

**A modern, full-stack Todo application built with React.js and Node.js.**

Organize your life, one task at a time — with a clean UI, smooth user experience, and reliable backend.

---

## ✨ **Key Features**

- ✅ Add, edit, delete, and view todos with real-time updates
- ☑️ **Mark tasks as completed** with visual checkboxes and status tracking
- ✏️ **Edit mode auto-closes** when a new todo is added
- 🔄 Seamless state management using React Hooks
- 📊 **Smart task counters** showing total, completed, and pending tasks
- 🧪 Robust backend API built with Express and MongoDB
- 📱 Fully responsive design (desktop and mobile)
- 🔔 Toast notifications for all actions
- 🎨 **Visual feedback** for completed tasks (strikethrough and dimmed)
- 🗂️ Clean, scalable project structure

---

## 🛠️ **Tech Stack**

### 🔹 Frontend

- **React.js 18+** – Modern component-based UI
- **Vite** – Lightning-fast dev server and bundler
- **Tailwind CSS** – Utility-first styling
- **React Hook Form** – Easy form handling
- **Axios** – Simplified HTTP requests
- **React Toastify** – User-friendly toast notifications

### 🔸 Backend

- **Node.js** – JavaScript runtime
- **Express.js** – Minimal and flexible server
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **CORS** – Cross-origin resource sharing
- **dotenv** – Environment variable management

---

## 📁 **Project Structure**

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

| Method   | Endpoint      | Description       | Body                       |
| -------- | ------------- | ----------------- | -------------------------- |
| `GET`    | `/`           | Get all todos     | None                       |
| `POST`   | `/`           | Create new todo   | `{"item": "Todo text"}`    |
| `PATCH`  | `/:id`        | Update todo text  | `{"item": "Updated text"}` |
| `PUT`    | `/:id/toggle` | Toggle completion | None                       |
| `DELETE` | `/:id`        | Delete todo       | None                       |

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

#### Toggle Todo Completion

```bash
curl -X PUT http://localhost:3000/TODO_ID/toggle \
  -H "Content-Type: application/json"
```

#### Delete Todo

```bash
curl -X DELETE http://localhost:3000/TODO_ID
```

## Author

**Gaurav Pratap Singh**

- GitHub: [@gauravsingh1281](https://github.com/gauravsingh1281)
- Linkedin: [@gauravsingh1281](https://www.linkedin.com/in/gauravsingh1281)

---
