# 🚀 Flixora App (Movies Platform)
---

## 📌 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router DOM | Routing |
| Zustand | State Management |
| Axios | HTTP Requests |
| Framer Motion | Animations |
| Recharts | Charts & Analytics |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| Stripe JS | Payment UI |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT Authentication | Auth Tokens |
| bcryptjs | Password Hashing |
| Cookie Parser | Cookie Handling |
| CORS | Cross-Origin Requests |
| Dotenv | Environment Variables |
| Stripe | Payment Integration |

---

## ✨ Features

### 🔐 Authentication System
- User Signup & Login
- JWT Access & Refresh Tokens
- Protected Routes
- Admin Authorization

### 🎬 Netflix Clone
- Browse Movies
- Movie Details Page
- Watch Trailer
- Responsive UI
- Animations with Framer Motion

### 🛒 E-Commerce Platform
- Product & Category Management
- Shopping Cart
- Checkout System
- Stripe Payment Integration
- Coupon / Discount System
- Order Management
- Admin Dashboard with Analytics
- Sales Charts (Recharts)

---

## 📂 Project Structure

```
├── client/             → React Frontend
└── server/
    ├── models/         → MongoDB Models
    ├── routes/         → API Routes
    ├── controllers/    → Business Logic
    └── middleware/     → Auth Middleware
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the `/server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLIENT_URL=http://localhost:5173
```

---

## 📸 Screenshots

> Screenshots coming soon...

| Home | Dashboard | Checkout |
|------|-----------|----------|
| ![Home](screenshots/home.png) | ![Dashboard](screenshots/dashboard.png) | ![Checkout](screenshots/checkout.png) |

---

## 📈 Future Improvements

- [ ] Add Wishlist Feature
- [ ] Add Product Reviews
- [ ] Add Email Notifications
- [ ] Add Docker Deployment
- [ ] Add CI/CD Pipeline

---

## 👨‍💻 Author

**Mahmoud Refaat**

- GitHub: [@Mahmoud-Refaat07](https://github.com/Mahmoud-Refaat07)
- LinkedIn: *(Add your LinkedIn)*
