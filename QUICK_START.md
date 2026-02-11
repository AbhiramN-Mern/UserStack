# Quick Start Guide - Admin Panel Redux React

## 📦 One-Minute Setup

### **Quick Commands**

```bash
# Backend Setup
cd Back-End
npm install
# Create .env with MONGODB_URI and JWT_SECRET
npm start

# Frontend Setup (in another terminal)
cd Front-End
npm install
npm run dev
```

---

## 🎯 Key Endpoints

### **User Flows**
- **Register:** POST `/api/auth/signup` → `{name, email, password}`
- **Login:** POST `/api/auth/login` → `{email, password}`
- **Get Profile:** GET `/api/auth/profile/:id`
- **Update Profile:** PUT `/api/auth/profile/:id`

### **Admin Flows**
- **Admin Login:** POST `/api/admin/login` → `{email, password}`
- **View Users:** GET `/api/admin/users`
- **Edit User:** PUT `/api/admin/users/:id`
- **Delete User:** DELETE `/api/admin/users/:id`
- **Upload Image:** POST `/api/admin/users/:id/upload`

---

## 📍 Route Map

```
Frontend Routes:
/                 → User Login
/signup          → User Registration  
/home            → User Dashboard
/profile/:id     → User Profile
/admin/login     → Admin Login
/dashboard       → Admin Control Panel
/*               → 404 Error Page
```

---

## 🔑 Environment Variables

### **Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/admin-panel
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
```

### **Frontend (src/api/api.js)**
```
Base URL: http://localhost:2323/api
```

---

## 🚦 Default Credentials (Test)

Check your MongoDB for existing admin/user documents or create test accounts:

**Test User:**
- Email: `user@example.com`
- Password: `password123`

**Test Admin:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📁 File Locations Reference

| Component | Location |
|-----------|----------|
| Redux Store | `Front-End/src/app/store.js` |
| User Reducer | `Front-End/src/features/userSlice.js` |
| API Config | `Front-End/src/api/api.js` |
| Server Setup | `Back-End/server.js` |
| User Controller | `Back-End/controller/userController.js` |
| Admin Controller | `Back-End/controller/adminController.js` |
| Routes | `Back-End/router/` |
| Database Models | `Back-End/model/` |
| Middleware | `Back-End/Middleware/` |
| Uploads | `Back-End/uploads/` |

---

## 🐛 Common Issues & Solutions

### **MongoDB Connection Failed**
```
Error: connect ECONNREFUSED
Solution: 
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify connection string format
```

### **CORS Error**
```
Error: Access to XMLHttpRequest blocked by CORS
Solution:
- Backend must be running on port 2323
- Frontend must be on port 1010
- Check CORS origin in server.js
```

### **JWT Token Expired**
```
Error: TokenExpiredError
Solution:
- Token expires in 1 hour
- Need to re-login
- Token stored in Redux & localStorage
```

### **File Upload Issues**
```
Error: Multer error on file upload
Solution:
- Check /uploads directory exists
- Verify file size limits
- Ensure correct Content-Type header
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend running: `http://localhost:2323`
- [ ] Frontend running: `http://localhost:1010`
- [ ] MongoDB connected (check server console)
- [ ] Can access login page
- [ ] Can sign up new user
- [ ] Can login successfully
- [ ] Redux store showing user data
- [ ] Can access admin login at `/admin/login`
- [ ] Admin can view users in dashboard
- [ ] Error page shows on invalid route

---

## 🔧 Development Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
npm start           # Start with nodemon (auto-reload)
npm test            # Run tests (if configured)
```

---

## 📚 Tech Stack Summary

**Frontend:** React 19 + Vite + Redux Toolkit + React Router
**Backend:** Express.js + Node.js + MongoDB + Mongoose
**Auth:** JWT + Bcryptjs
**File Upload:** Multer
**HTTP Client:** Axios

---

## 🎨 Project Features

✅ User signup & login  
✅ Admin dashboard  
✅ User management (CRUD)  
✅ Profile picture upload  
✅ JWT authentication  
✅ Redux state persistence  
✅ Error handling & 404 page  
✅ CORS protected  
✅ Password hashing  
✅ Responsive design  

---

## 📞 Need Help?

1. Check the full documentation in `PROJECT_DOCUMENTATION.md`
2. Review error messages in browser console
3. Check backend server logs for API errors
4. Verify all environment variables are set
5. Ensure MongoDB is running and accessible

---

**Happy coding! 🚀**
