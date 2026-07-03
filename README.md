# 💬 Chatty – Real-Time Chat Application

A full-stack real-time chat application built with **React**, **Redux Toolkit**, **Node.js**, **Express.js**, **MySQL**, and **Socket.IO**. The application provides secure authentication, instant messaging, profile management, and theme customization through a modern and responsive user interface.

---

## ✨ Features

* 🔐 JWT Authentication with HTTP-only cookies
* 💬 Real-time one-to-one messaging using Socket.IO
* 👤 User profile management with Cloudinary image uploads
* 🟢 Online user status
* 🎨 Multiple DaisyUI themes
* 📱 Responsive design for desktop and mobile
* 🔒 Protected routes and authentication middleware
* ⚡ RESTful APIs for authentication, users, and messaging
* 🗄️ MySQL relational database with optimized schema design
* 📦 Redux Toolkit for global state management

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* DaisyUI
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MySQL
* Socket.IO
* JWT Authentication
* bcrypt.js
* Cloudinary
* Cookie Parser

---

## 📂 Project Structure

```text
Chatty/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── lib/
│   │   ├── utils/
│   │   └── index.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yaswanth-swargam/Chatty.git
cd Chatty
```

### Backend Setup

```bash
cd Backend
npm install
npm run start
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **Backend** directory.

```env
PORT=3000

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 👨‍💻 Author

**Yaswanth Swargam**

* GitHub: https://github.com/yaswanth-swargam
* LinkedIn: https://www.linkedin.com/in/yaswanth-swargam/

---

## ⭐ If you found this project helpful, consider giving it a star!
