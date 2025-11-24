# MERN Blog Application

A full-stack blog application built with **MongoDB, Express.js, React.js, and Node.js (MERN)**.  
This project demonstrates seamless integration between front-end and back-end components, including database operations, API communication, state management, and optional features like authentication and image uploads.

---

## 🚀 Features

- Create, read, update, and delete blog posts (CRUD)  
- Categories for posts  
- React Router for front-end navigation  
- Context + useReducer for state management  
- Form validation using **Joi** or **express-validator**  
- Error handling middleware on the server  
- Optional advanced features:
  - User authentication (register/login) with JWT
  - Image uploads for posts
  - Pagination, searching, and filtering
  - Comments on blog posts

---

## 🧰 Tech Stack

- **Front-end:** React, Vite, Tailwind CSS (optional), React Router  
- **Back-end:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JSON Web Token (JWT) and bcrypt  
- **Image Uploads:** Multer or Cloudinary  
- **Validation:** Joi or express-validator  

---

## 📂 Folder Structure

### Backend (server)
server/
├─ controllers/
│ ├─ postController.js
│ └─ categoryController.js
├─ models/
│ ├─ Post.js
│ └─ Category.js
├─ routes/
│ ├─ postRoutes.js
│ └─ categoryRoutes.js
├─ middleware/
│ ├─ errorMiddleware.js
│ └─ authMiddleware.js
├─ uploads/ (optional)
├─ server.js
├─ package.json
└─ .env

shell
Copy code

### Frontend (client)
client/
├─ src/
│ ├─ api/ # API service
│ ├─ components/
│ ├─ context/ # Post context
│ ├─ hooks/
│ ├─ pages/
│ └─ styles/
├─ package.json
├─ vite.config.js
└─ index.html

yaml
Copy code

---

## ⚡ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog
2. Install backend dependencies
bash
Copy code
cd server
npm install
3. Install frontend dependencies
bash
Copy code
cd ../client
npm install
🌐 Environment Variables
Create a .env file in server/:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

🏃‍♂️ Running the Application
Start backend (server)
bash
Copy code
cd server
npm run dev
Start frontend (client)
bash
Copy code
cd client
npm run dev
Open your browser at http://localhost:5173 (Vite default) to see the app.

📖 API Endpoints
Posts
Method	Endpoint	Description
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get single post
POST	/api/posts	Create a new post
PUT	/api/posts/:id	Update a post
DELETE	/api/posts/:id	Delete a post

Categories
Method	Endpoint	Description
GET	/api/categories	Get all categories
POST	/api/categories	Create a new category

👩‍💻 Contributing
Fork the project

Create your branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature"

Push to the branch: git push origin feature-name

Open a pull request

📜 License
This project is licensed under the MIT License.

💡 Acknowledgements
React

Node.js

Express

MongoDB

Tailwind CSS

Cloudinary

yaml
Copy code

---

If you want, I can also **add a section with screenshots** and a **live demo link** to make it look even more professional for GitHub.  

Do you want me to do that?