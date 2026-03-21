# Mechlonix 🚗

Mechlonix is a full-stack web application designed for managing vehicle bookings and user interactions efficiently. It provides a seamless platform for users to browse vehicles, make bookings, and share feedback.

## 🚀 Features

- 🔐 User Authentication (Login & Signup)
- 🚘 Vehicle Management
- 📅 Booking System
- 💬 Feedback System
- 🛡️ Secure API with Middleware
- 🌐 Full-stack architecture (Frontend + Backend)

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

## 📁 Project Structure
mechlonix/
│
├── frontend/ # React frontend
├── backend/ # Node.js backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── middleware/
│
├── .gitignore
└── README.md


## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/RushithaDuvarapu89/mechlonix.git
cd mechlonix


2. Setup Backend
cd backend
npm install
npm start

3. Setup Frontend
cd frontend
npm install
npm start

🔑 Environment Variables

Create a .env file inside the backend folder and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📌 Future Enhancements
Payment integration 💳
Admin dashboard 📊
Real-time notifications 🔔
Deployment on cloud ☁️
