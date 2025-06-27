# 🔐 Authentication API

Welcome to the **Authentication API** project! This is a Node.js RESTful API for user authentication and role-based access control using Express, MongoDB, JWT, and bcrypt. 🚀

---

## 📦 Features
- User Signup & Login
- Password Hashing with bcrypt
- JWT Authentication
- Role-based Access Control (Student, Admin, Visitor)
- MongoDB Integration with Mongoose

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd authentication
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory:**
   > ⚠️ **Important:** The project requires a `.env` file with the following variables:
   ```env
   PORT=4000
   DB_URL=mongodb://localhost:27017/authentication
   JWT_SECRET=your_jwt_secret_key
   N=10
   ```
   - `PORT`: Port number for the server (default: 4000)
   - `DB_URL`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT signing
   - `N`: Salt rounds for bcrypt password hashing

4. **Start the server:**
   ```bash
   npm run dev   # For development (nodemon)
   # or
   npm start     # For production
   ```

5. **Test the API:**
   The server will run at [http://localhost:4000](http://localhost:4000)

---

## 📚 API Endpoints

### 👤 User Authentication

- **POST `/api/users/signup`**  
  Register a new user.
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "yourpassword", "role": "student" }`

- **POST `/api/users/login`**  
  Login and receive a JWT token (set as an HTTP-only cookie).
  - Body: `{ "email": "john@example.com", "password": "yourpassword" }`

### 🛡️ Role-Based Access

- **GET `/api/users/student`**  
  Access for users with role `student` (requires JWT token).

- **GET `/api/users/admin`**  
  Access for users with role `admin` (requires JWT token).

---

## 🧪 Sample Data

Here are two sample users you can use for testing (replace passwords as needed):

### 1️⃣ Student User
```json
{
  "name": "Alice Student",
  "email": "alice@student.com",
  "password": "alice123",
  "role": "student"
}
```

### 2️⃣ Admin User
```json
{
  "name": "Bob Admin",
  "email": "bob@admin.com",
  "password": "bobadmin",
  "role": "admin"
}
```

---

## 📝 Notes
- Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints.
- JWT token is sent as an HTTP-only cookie after login.
- Passwords are securely hashed using bcrypt.
- Make sure MongoDB is running locally or update `DB_URL` for your setup.



---

  >> Happy Coding! 🎉 