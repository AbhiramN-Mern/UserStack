# Admin Panel Redux React - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [API Endpoints](#api-endpoints)
7. [Setup & Installation](#setup--installation)
8. [Feature Details](#feature-details)
9. [Security Considerations](#security-considerations)
10. [Future Improvements](#future-improvements)

---

## 🎯 Project Overview

**Admin Panel Redux React** is a full-stack web application that provides an administrative dashboard for managing users. The application features a dual-role system with separate login portals for **Users** and **Admins**, enabling different levels of access and functionality.

### Key Features:
- **User Authentication & Authorization** - Login/Signup with JWT tokens
- **Admin Dashboard** - Manage all users (view, edit, delete)
- **User Profile Management** - Users can view and update their profiles
- **Redux State Management** - Centralized state with persistence
- **Responsive Design** - Mobile-friendly interface
- **File Upload** - Profile picture uploads via Multer
- **Error Handling** - Custom 404 error page

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^19.1.0 | UI Framework |
| **Vite** | ^6.3.5 | Build Tool & Dev Server |
| **React Router** | ^7.6.0 | Client-side Routing |
| **Redux Toolkit** | ^2.8.2 | State Management |
| **Redux Persist** | ^6.0.0 | Local Storage Persistence |
| **Axios** | ^1.9.0 | HTTP Client |
| **SweetAlert2** | ^11.21.2 | User Alerts & Confirmations |
| **Toastify-js** | ^1.12.0 | Toast Notifications |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | - | Runtime Environment |
| **Express.js** | ^5.1.0 | Web Framework |
| **MongoDB** | (via Mongoose) | Database |
| **Mongoose** | ^8.15.0 | ODM for MongoDB |
| **JWT** | ^9.0.2 | Authentication Token |
| **Bcryptjs** | ^3.0.2 | Password Hashing |
| **Multer** | ^1.4.5-lts.2 | File Upload Handler |
| **CORS** | ^2.8.5 | Cross-Origin Requests |
| **Dotenv** | ^16.5.0 | Environment Variables |
| **Nodemon** | ^3.1.10 | Development Auto-reload |

---

## 📁 Project Structure

```
AdminPanel-Redux-React/
│
├── Front-End/
│   ├── src/
│   │   ├── App.jsx                 # Main application component with routing
│   │   ├── main.jsx                # React entry point
│   │   ├── index.css               # Global styles
│   │   ├── api/
│   │   │   └── api.js              # Axios instance configuration
│   │   ├── app/
│   │   │   └── store.js            # Redux store & persistence setup
│   │   ├── features/
│   │   │   └── userSlice.js        # Redux user slice (actions & reducers)
│   │   ├── components/
│   │   │   ├── adminHeader/        # Admin dashboard header
│   │   │   └── Header/             # User page header
│   │   ├── pages/
│   │   │   ├── UserLogin/          # User login page
│   │   │   ├── UserSignup/         # User registration page
│   │   │   ├── UserHome/           # User home/dashboard
│   │   │   ├── UserProfile/        # User profile view & edit
│   │   │   ├── AdminLogin/         # Admin login page
│   │   │   ├── AdminDashboard/     # Admin control panel
│   │   │   └── ErrorPage/          # 404 error page
│   │   └── assets/                 # Images, icons, etc.
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   └── index.html                  # HTML template
│
└── Back-End/
    ├── server.js                   # Express server setup
    ├── package.json                # Backend dependencies
    ├── controller/
    │   ├── userController.js       # User signup, login, profile logic
    │   └── adminController.js      # Admin login, user management
    ├── model/
    │   ├── userSchema.js           # User data model
    │   └── adminSchema.js          # Admin data model
    ├── router/
    │   ├── userRouter.js           # User routes
    │   └── adminRouter.js          # Admin routes
    ├── Middleware/
    │   ├── verifyToken.js          # JWT verification middleware
    │   └── multer.js               # File upload configuration
    ├── Helpers/
    │   └── bycript.js              # Password hashing & comparison
    ├── DB/
    │   └── connectDB.js            # MongoDB connection
    └── uploads/                    # User profile images storage
```

---

## 🎨 Frontend Architecture

### 1. **Routing Structure**

```javascript
// App.jsx - Route Configuration
/              → UserLogin         (Public)
/signup        → UserSignup        (Public)
/home          → UserHome          (Protected)
/profile/:id   → UserProfile       (Protected)
/admin/login   → AdminLogin        (Public)
/dashboard     → AdminDashboard    (Protected)
/*             → ErrorPage         (404 Fallback)
```

### 2. **Redux Store Structure**

```javascript
Store: {
  user: {
    user: {
      _id: string,
      name: string,
      email: string,
      profileImage?: string
    },
    token: string (JWT),
    isLoggedIn: boolean
  }
}
```

**Redux Slice Actions:**
- `setUser(payload)` - Store user data and set login state
- `setToken(payload)` - Store authentication token
- `logoutUser()` - Clear user data and log out

**Persistence:**
- Redux Persist saves store to localStorage with key 'root'
- Automatically restores state on app refresh

### 3. **API Integration**

**Base URL:** `http://localhost:2323/api`

**Axios Instance** (api.js):
```javascript
const api = axios.create({
  baseURL: 'http://localhost:2323/api'
})
```

Axios automatically includes authorization headers from Redux store when configured.

### 4. **Component Structure**

#### **User Components**
- **Header** - Navigation bar with user info
- **UserLogin** - Login form with email/password
- **UserSignup** - Registration form validation
- **UserHome** - Dashboard after login
- **UserProfile** - View/Edit profile with image upload

#### **Admin Components**
- **AdminHeader** - Admin-specific navigation
- **AdminLogin** - Admin authentication
- **AdminDashboard** - User management interface
  - View all users
  - Edit user details
  - Delete users
  - Search functionality

#### **Error Page**
- Custom 404 page with navigation
- Styled gradient background
- Button to return to home

---

## 🔧 Backend Architecture

### 1. **Server Configuration** (server.js)

```javascript
// Express Setup
const app = express()
const PORT = 2323

// Middleware
app.use(cors({ origin: 'http://localhost:1010' }))
app.use(bodyParser.json())
app.use('/uploads', express.static(...)) // Serve uploaded files

// Routes
app.use('/api/auth', userRouter)
app.use('/api/admin', adminRouter)

// Database
DB() // MongoDB Connection

app.listen(2323)
```

### 2. **Database Models**

#### **User Schema** (userSchema.js)
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  profileImage: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

#### **Admin Schema** (adminSchema.js)
```javascript
{
  email: String (required, unique),
  password: String (plain text - SECURITY ISSUE),
  createdAt: Date (auto)
}
```

### 3. **Authentication Flow**

#### **User Signup** (POST `/api/auth/signup`)
1. Receive: `{ name, email, password }`
2. Check if user exists (duplicate prevention)
3. Hash password using bcryptjs
4. Create user in database
5. Generate JWT token (expires in 1 hour)
6. Return: `{ token, user }`

#### **User Login** (POST `/api/auth/login`)
1. Receive: `{ email, password }`
2. Find user by email
3. Compare passwords with bcryptjs
4. Generate JWT token
5. Return: `{ token, user }`

#### **Admin Login** (POST `/api/admin/login`)
1. Receive: `{ email, password }`
2. Find admin by email
3. Direct password comparison (NOT hashed - security issue)
4. Generate JWT token
5. Return: `{ token, admin }`

### 4. **User Management Endpoints**

#### **Get All Users** (GET `/api/admin/users`)
- Protected by JWT middleware
- Returns all user data

#### **Update User** (PUT `/api/admin/users/:id`)
- Updates user profile information
- Supports image uploads via Multer

#### **Delete User** (DELETE `/api/admin/users/:id`)
- Removes user from database
- Admin only

#### **Get User Profile** (GET `/api/auth/profile/:id`)
- Fetch individual user data
- User verification

### 5. **Middleware**

#### **JWT Verification** (verifyToken.js)
```javascript
// Checks Authorization header
// Validates token signature
// Attaches decoded user to req.user
// Prevents unauthorized access
```

#### **File Upload** (multer.js)
```javascript
// Destination: /Back-End/uploads/
// File naming: Unique hash-based names
// Allowed formats: Images (jpg, png, gif, webp)
// Size limit: Configurable
```

### 6. **Helper Functions** (bycript.js)

```javascript
hashPassword(password)     // Hash using bcryptjs
checkPassword(plain, hash) // Compare passwords
```

---

## 🔌 API Endpoints

### **User Authentication Endpoints**

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | `{name, email, password}` |
| POST | `/api/auth/login` | User login | `{email, password}` |
| GET | `/api/auth/profile/:id` | Get user profile | - |
| PUT | `/api/auth/profile/:id` | Update profile | `{name, email, ...}` |

### **Admin Endpoints**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/login` | Admin login | - |
| GET | `/api/admin/users` | Get all users | JWT |
| GET | `/api/admin/users/:id` | Get user by ID | JWT |
| PUT | `/api/admin/users/:id` | Update user | JWT |
| DELETE | `/api/admin/users/:id` | Delete user | JWT |
| POST | `/api/admin/users/:id/upload` | Upload profile image | JWT |

---

## 🚀 Setup & Installation

### **Prerequisites**
- Node.js (v16+)
- MongoDB (Local or Atlas)
- npm or yarn package manager

### **Backend Setup**

```bash
# Navigate to backend directory
cd Back-End

# Install dependencies
npm install

# Create .env file
# Add following environment variables:
# MONGODB_URI=mongodb://localhost:27017/admin-panel
# JWT_SECRET=your_secret_key
# PORT=2323

# Start server
npm start
# Server runs on http://localhost:2323
```

### **Frontend Setup**

```bash
# Navigate to frontend directory
cd Front-End

# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:1010 (or assigned port)

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Environment Variables**

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/admin-panel
JWT_SECRET=your_jwt_secret_key
PORT=2323
```

**Frontend (vite.config.js)**
```javascript
// API_BASE_URL is configured in src/api/api.js
export const API_BASE = 'http://localhost:2323/api'
```

---

## ✨ Feature Details

### **1. User Authentication**

**Signup Flow:**
- Form validation (email format, password strength)
- Check for duplicate emails
- Password hashing with bcryptjs
- JWT token generation
- Automatic login after signup

**Login Flow:**
- Email and password validation
- Secure password comparison
- Token stored in Redux & localStorage
- Automatic redirect to dashboard

**Logout:**
- Clear Redux store
- Remove localStorage data
- Redirect to login page

### **2. User Profile Management**

**View Profile:**
- Display user information
- Show profile picture
- Display account creation date

**Edit Profile:**
- Update name and email
- Change password (optional)
- Upload profile picture
- Image validation and compression

### **3. Admin Dashboard**

**User Management:**
- Table view of all users
- Search users by name/email
- Pagination (if implemented)
- Edit user details
- Delete users with confirmation

**Admin Actions:**
- View user count statistics
- Recent user registrations
- User activity monitoring

### **4. File Upload System**

**Profile Images:**
- Destination: `/Back-End/uploads/`
- Naming: Unique hash-based filenames
- Access: Via `/uploads/[filename]` endpoint
- Validation: Image type and size checks

### **5. Error Handling**

**Frontend:**
- 404 error page for non-existent routes
- Form validation errors
- API error messages with toast notifications
- Try-catch blocks in async operations

**Backend:**
- Status codes (200, 201, 400, 409, 500)
- Meaningful error messages
- Console logging for debugging

---

## 🔐 Security Considerations

### **Current Security Measures:**
1. ✅ **Password Hashing** - Users passwords hashed with bcryptjs
2. ✅ **JWT Authentication** - Token-based authorization
3. ✅ **CORS Protection** - Limited to frontend origin
4. ✅ **Token Expiration** - 1 hour expiry time
5. ✅ **Protected Routes** - Middleware verification

### **Security Issues to Fix:**

⚠️ **CRITICAL:**
1. **Admin Password Storage** - Stored in plain text, should be hashed
   ```javascript
   // Fix: Use bcryptjs for admin passwords too
   const hashedPassword = await hashPassword(password)
   ```

2. **CORS Whitelist** - Only allows `http://localhost:1010`
   - Add environment variable for dynamic CORS
   - Restrict in production

3. **JWT Secret** - Should be in environment variables
   - Use strong, random secret
   - Rotate regularly

4. **Token in LocalStorage** - Vulnerable to XSS attacks
   - Consider using HttpOnly cookies
   - Implement token refresh mechanism

### **Recommended Improvements:**

```javascript
// Use environment variables
require('dotenv').config()
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
}

// Implement token refresh
const refreshToken = jwt.sign(...)
app.post('/api/auth/refresh', validateRefreshToken, issueNewToken)

// Use HttpOnly cookies for tokens
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
})
```

---

## 📈 Future Improvements

### **Phase 1 - Security**
- [ ] Hash admin passwords with bcryptjs
- [ ] Implement token refresh mechanism
- [ ] Use HttpOnly cookies for tokens
- [ ] Add rate limiting for login attempts
- [ ] Implement 2FA (Two-Factor Authentication)

### **Phase 2 - Features**
- [ ] User roles and permissions system
- [ ] Email verification on signup
- [ ] Password reset functionality
- [ ] User activity logs
- [ ] Bulk user import/export
- [ ] Advanced search and filtering

### **Phase 3 - UI/UX**
- [ ] Pagination for user list
- [ ] Dark mode theme
- [ ] Data export (CSV, PDF)
- [ ] Dashboard analytics charts
- [ ] User activity timeline
- [ ] Notification system

### **Phase 4 - Performance**
- [ ] Implement caching (Redis)
- [ ] Optimize database queries
- [ ] Pagination for large datasets
- [ ] Image optimization and CDN
- [ ] API rate limiting
- [ ] Load testing and optimization

### **Phase 5 - Testing & DevOps**
- [ ] Unit tests (Jest, Vitest)
- [ ] Integration tests (Supertest)
- [ ] E2E tests (Cypress, Playwright)
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Production deployment setup

---

## 📖 Code Examples

### **Redux Usage in Components**

```javascript
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setToken, logoutUser } from '../features/userSlice'

function LoginComponent() {
  const dispatch = useDispatch()
  const { user, isLoggedIn } = useSelector(state => state.user)

  const handleLogin = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    dispatch(setUser(response.data.user))
    dispatch(setToken({ token: response.data.token }))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    // JSX
  )
}
```

### **API Call with Axios**

```javascript
import api from '../api/api'

// Get user profile
async function fetchUserProfile(userId) {
  try {
    const response = await api.get(`/auth/profile/${userId}`)
    return response.data.user
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}

// Upload profile image
async function uploadProfileImage(userId, formData) {
  try {
    const response = await api.post(
      `/admin/users/${userId}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

### **Protected Route Example**

```javascript
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector(state => state.user)

  return isLoggedIn ? children : <Navigate to="/" />
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
}/>
```

---

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request with detailed description

---

## 📝 License

This project is licensed under the ISC License.

---

## 📞 Support

For issues or questions:
- Check existing documentation
- Review error messages in console
- Check MongoDB connection status
- Verify environment variables
- Ensure both frontend and backend are running

---

**Last Updated:** February 2026
**Project Type:** Full-Stack Web Application
**Status:** In Development
