# Admin Panel Redux React

A full-stack web application providing an administrative dashboard for managing users with dual-role authentication (Users & Admins).

## Features

- **User Authentication & Authorization** - Secure login/signup with JWT tokens
- **Admin Dashboard** - Complete user management (view, edit, delete)
- **User Profile Management** - Users can update their profiles and upload profile pictures
- **Redux State Management** - Centralized state with localStorage persistence
- **Responsive Design** - Mobile-friendly interface
- **File Upload** - Profile picture uploads via Multer
- **JWT Protection** - Secure API endpoints with token verification
- **Custom Error Handling** - 404 error page and error boundaries

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^19.1.0 | UI Framework |
| Vite | ^6.3.5 | Build Tool & Dev Server |
| React Router | ^7.6.0 | Client-side Routing |
| Redux Toolkit | ^2.8.2 | State Management |
| Redux Persist | ^6.0.0 | State Persistence |
| Axios | ^1.9.0 | HTTP Client |
| SweetAlert2 | ^11.21.2 | Alert Dialogs |
| Toastify-js | ^1.12.0 | Toast Notifications |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | Latest | Runtime Environment |
| Express.js | ^5.1.0 | Web Framework |
| MongoDB | Latest | NoSQL Database |
| Mongoose | ^8.15.0 | MongoDB ODM |
| JWT | ^9.0.2 | Authentication |
| Bcryptjs | ^3.0.2 | Password Hashing |
| Multer | ^1.4.5-lts.2 | File Upload Handler |
| CORS | ^2.8.5 | Cross-Origin Requests |
| Dotenv | ^16.5.0 | Environment Variables |
| Nodemon | ^3.1.10 | Auto-reload (Dev) |

## Project Structure

```
Admin-Panel-Redux-React/
│
├── Back-End/
│   ├── server.js                   # Express server setup
│   ├── package.json                # Backend dependencies
│   ├── controller/
│   │   ├── userController.js       # User signup, login, profile
│   │   └── adminController.js      # Admin management logic
│   ├── model/
│   │   ├── userSchema.js           # User database schema
│   │   └── adminSchema.js          # Admin database schema
│   ├── router/
│   │   ├── userRouter.js           # User API routes
│   │   └── adminRouter.js          # Admin API routes
│   ├── middleware/
│   │   ├── verifyToken.js          # JWT verification
│   │   └── multer.js               # File upload handling
│   ├── helpers/
│   │   └── bcrypt.js               # Password hashing utilities
│   ├── DB/
│   │   └── connectDB.js            # MongoDB connection
│   └── uploads/                    # Uploaded files storage
│
├── Front-End/
│   ├── src/
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── main.jsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   ├── api/
│   │   │   └── api.js              # Axios configuration
│   │   ├── app/
│   │   │   └── store.js            # Redux store setup
│   │   ├── features/
│   │   │   └── userSlice.js        # Redux user reducer
│   │   ├── components/
│   │   │   ├── Header/             # User header
│   │   │   └── adminHeader/        # Admin header
│   │   ├── pages/
│   │   │   ├── UserLogin/          # User login page
│   │   │   ├── UserSignup/         # User registration
│   │   │   ├── UserHome/           # User dashboard
│   │   │   ├── UserProfile/        # Profile view & edit
│   │   │   ├── AdminLogin/         # Admin login
│   │   │   ├── AdminDashboard/     # Admin control panel
│   │   │   └── ErrorPage/          # 404 error
│   │   └── assets/                 # Images & icons
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── README.md                        # This file
├── PROJECT_DOCUMENTATION.md         # Detailed documentation
├── ARCHITECTURE.md                  # System architecture
└── QUICK_START.md                   # Quick setup guide

```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Back-End
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `Back-End` folder:
```env
MONGODB_URI=mongodb://localhost:27017/admin-panel
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
PORT=2323
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:2323`

### Frontend Setup

1. Open a new terminal and navigate to the Frontend directory:
```bash
cd Front-End
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173` or `http://localhost:1010`

## API Endpoints

### User Authentication Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/profile/:id` | Get user profile | ✅ |
| PUT | `/api/auth/profile/:id` | Update user profile | ✅ |

### Admin Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/login` | Admin login | ❌ |
| GET | `/api/admin/users` | Get all users | ✅ |
| PUT | `/api/admin/users/:id` | Edit user | ✅ |
| DELETE | `/api/admin/users/:id` | Delete user | ✅ |
| POST | `/api/admin/users/:id/upload` | Upload profile image | ✅ |

## Route Map

### Frontend Routes
```
/                    → User Login
/signup             → User Registration
/home               → User Dashboard
/profile/:id        → User Profile Page
/admin/login        → Admin Login
/dashboard          → Admin Control Panel
/*                  → 404 Error Page
```

## Authentication & Security

### JWT Token
- Tokens are generated upon successful login
- Stored in Redux state and localStorage
- Included in API request headers: `Authorization: Bearer <token>`
- Verified by `verifyToken` middleware

### Password Security
- Passwords are hashed using **Bcryptjs** (rounds: 10+)
- Never stored in plain text
- Verified during login using bcrypt comparison

### Protected Routes
- Admin routes require valid JWT token
- Token verification happens server-side
- Invalid/expired tokens return 401 Unauthorized

## Testing the Application

### Test Credentials

Create test accounts in MongoDB or use these endpoints:

**User Registration:**
```
POST http://localhost:2323/api/auth/signup
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**User Login:**
```
POST http://localhost:2323/api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Admin Login:**
```
POST http://localhost:2323/api/admin/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

## Build & Deployment

### Build Frontend
```bash
cd Front-End
npm run build
```
Output will be in the `dist` folder.

### Build Backend
The backend doesn't require building. You can deploy `Back-End` folder directly to your server.

## State Management (Redux)

### Redux Store Structure
```javascript
{
  user: {
    user: {
      _id: String,
      name: String,
      email: String,
      image: String
    },
    token: String,
    isLoggedIn: Boolean
  }
}
```

### Redux Actions
- `setUser(userData)` - Set user data after login
- `setToken(token)` - Store JWT token
- `setIsLoggedIn(boolean)` - Update login status
- `logoutUser()` - Clear user data

State is automatically persisted to localStorage via Redux Persist.

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/admin-panel
JWT_SECRET=your-secret-key-min-32-characters-long
NODE_ENV=development
PORT=2323
```

### Frontend (src/api/api.js)
Base API URL is configured to: `http://localhost:2323/api`

## File Upload

### How File Upload Works
1. User selects image on profile page
2. Multer middleware processes the file
3. File is stored in `Back-End/uploads/` with a unique hash name
4. File path is saved in the user's database record

### Upload Limits
- File types: Images (JPEG, PNG, GIF)
- Max file size: Configured in `Middleware/multer.js`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Verify network access if using MongoDB Atlas

### CORS Errors
- Verify backend is running on port 2323
- Check CORS configuration in `server.js`
- Ensure frontend URL matches CORS allowlist

### JWT Token Errors
- Clear localStorage and re-login
- Check JWT_SECRET matches between server sessions
- Verify token expiration settings

## Development Workflow

### Available Scripts

**Backend:**
```bash
npm start        # Start with auto-reload (nodemon)
```

**Frontend:**
```bash
npm run dev      # Start dev server with HMR
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Additional Documentation

- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) - Comprehensive project details
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture & data flow
- [QUICK_START.md](QUICK_START.md) - Quick setup reference

## Future Improvements

- [ ] Email verification for user registration
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting
- [ ] Enhanced file validation
- [ ] Pagination for user list
- [ ] Search & filter capabilities
- [ ] Dark mode support
- [ ] Unit & integration tests

## License

ISC License - feel free to use this project as you like.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## Support

For questions or issues, please refer to the documentation files or create an issue in the repository.

---

**Last Updated:** February 2026

Happy coding!
