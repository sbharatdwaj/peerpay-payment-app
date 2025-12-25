# 💸 PeerPay – Username-Based Payment Application

PeerPay is a full-stack payment simulation application that allows users to sign up, log in, and send money to other users using unique usernames. The project demonstrates authentication, authorization, database integration, and secure transaction handling using the MERN stack.

---

## 🚀 Features

### 🔐 Authentication
- User Signup & Login
- Password hashing using **bcrypt**
- JWT-based authentication
- Protected routes
- Proper error handling for invalid credentials

### 💰 Wallet System
- Each user is assigned an initial wallet balance on signup
- Balance is stored and managed in MongoDB
- Real-time balance updates after transactions

### 🔄 Payment Functionality
- Send money using **receiver's username**
- Validates:
  - Receiver existence
  - Sufficient balance
  - Valid amount
- Updates sender and receiver balances
- Saves each transaction in the database

### 📄 Transactions
- Stores sender, receiver, amount, and timestamp
- Can be extended to show transaction history

---

## 🧠 Tech Stack

### Frontend
- **React**
- **React Router**
- **Axios**
- **JavaScript**
- **HTML / CSS**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcrypt**

---

## 📁 Project Structure

```
peerpay-payment-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
```

---

## 🔐 Database Models

### User
```javascript
{
  username: String (unique),
  email: String,
  password: String,
  balance: Number
}
```

### Transaction
```javascript
{
  senderUsername: String,
  receiverUsername: String,
  amount: Number,
  timestamp: Date
}
```

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/sbharatdwaj/peerpay-payment-app.git
cd peerpay-payment-app
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

**Frontend runs at:** [http://localhost:3000](http://localhost:3000)  
**Backend runs at:** [http://localhost:5000](http://localhost:5000)

---

## 🔄 Application Flow
1. User signs up with username, email, and password
2. JWT token is generated on login
3. User is redirected to dashboard
4. User enters receiver username and amount
5. Backend validates the request
6. Sender and receiver balances are updated
7. Transaction is stored in MongoDB

---

## 🧪 Error Handling
- Invalid login credentials
- User not found
- Insufficient wallet balance
- Unauthorized access
- Invalid transaction amount

---

## 🔒 Security Measures
- Passwords hashed using bcrypt
- JWT-based authentication
- Protected API routes
- Server-side validation
- No sensitive credentials committed to GitHub

---

## 📌 Future Improvements
- Transaction history UI
- Refresh token support
- Role-based access
- Payment gateway integration (Razorpay / Stripe)
- Email notifications
- Improved UI/UX

---

## 👨‍💻 Author
**Shivam Kumar**  
📧 Email: shivambharatdwaj3@gmail.com  
🔗 GitHub: [https://github.com/sbharatdwaj](https://github.com/sbharatdwaj)  
🔗 LinkedIn: [https://www.linkedin.com/in/shivambharatdwaj/](https://www.linkedin.com/in/shivambharatdwaj/)

---

**Note:** This is a demo application for educational purposes. Ensure proper security and compliance measures for production use.
