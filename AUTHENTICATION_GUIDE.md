# Authentication Frontend - Setup Guide

## Overview
This Angular application provides a complete authentication frontend that integrates with the Go auth-service backend.

## Architecture

### Frontend (Angular 20)
- **Location**: `auth-frontend/` directory
- **Port**: `http://localhost:4200`
- **Framework**: Angular 20 with Material Design

### Backend (Go auth-service)
- **Location**: `auth-service/` directory  
- **Port**: `http://localhost:8080`
- **Framework**: Gin (Go web framework)
- **Database**: In-memory (demo mode)

## Features Implemented

### Authentication Module
- ✅ Login component with Material Design
- ✅ Registration component with email validation
- ✅ Password confirmation validator
- ✅ JWT token management
- ✅ Auth guard for route protection
- ✅ HTTP interceptor for automatic token injection
- ✅ User profile menu with logout
- ✅ Reactive forms with validation
- ✅ Error handling and user feedback

### Security Features
- JWT-based authentication
- Refresh tokens (7-day expiry)
- Rate limiting on auth endpoints (5 requests/min)
- Password hashing (bcrypt)
- Protected routes
- Automatic token injection in HTTP requests

## Getting Started

### Prerequisites
- Node.js v20.19 or higher (currently using v24.11.1)
- npm v11.6.2
- Go 1.21+

### 1. Start the Backend (auth-service)

```powershell
cd "auth-service"
.\auth-server.exe
```

The auth-service will start on **http://localhost:8080**

**Demo Credentials:**
```
Email: user@example.com
Password: password
Role: user

Email: admin@example.com
Password: password
Role: admin
```

### 2. Start the Frontend (Angular)

```powershell
cd "auth-frontend"
npm start
```

The Angular app will be available at **http://localhost:4200**

### 3. Test the Application

1. Open browser to `http://localhost:4200`
2. Click "Login" in the sidebar
3. Use demo credentials:
   - Email: `user@example.com`
   - Password: `password`
4. After successful login, you'll be redirected to the dashboard
5. Your profile will appear in the top-right corner
6. Click your profile to logout

## Project Structure

```
auth-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts          # Route protection
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts    # JWT token injection
│   │   │   ├── models/
│   │   │   │   └── user.model.ts          # User interfaces
│   │   │   └── services/
│   │   │       └── auth.service.ts        # Authentication service
│   │   ├── features/
│   │   │   └── auth/
│   │   │       ├── login/                 # Login component
│   │   │       └── register/              # Registration component
│   │   ├── shared/
│   │   │   └── sidebar/                   # Sidebar with user menu
│   │   ├── app.config.ts                  # App configuration
│   │   └── app.routes.ts                  # Route definitions
│   └── environments/
│       └── environment.ts                 # API URL configuration
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout (token revocation)

### User Management
- `GET /api/me` - Get current user profile
- `GET /api/profile` - Get detailed profile

### Admin (requires admin role)
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## Configuration

### Frontend Configuration
Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### Backend Configuration
Edit `auth-service/.env`:

```env
SERVER_PORT=8080
DATABASE_DRIVER=inmemory
JWT_EXPIRY=10m
REFRESH_TOKEN_EXPIRY=168h
RATE_LIMIT_ENABLED=true
RATE_LIMIT_REQUESTS_PER_IP=5
```

## Authentication Flow

1. **User enters credentials** → Login component
2. **POST /auth/login** → Auth service endpoint
3. **Receive JWT token** → Stored in localStorage
4. **Redirect to dashboard** → Protected route
5. **HTTP requests** → Interceptor adds Bearer token
6. **Token validation** → Auth guard checks authentication
7. **Logout** → Clear localStorage, redirect to login

## Route Protection

Protected routes in `app.routes.ts`:

```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./dashboard/dashboard.ts'),
  canActivate: [authGuard]  // Protected route
}
```

Public routes:
- `/login`
- `/register`

## Development Notes

### CORS Configuration
The auth-service allows CORS from `http://localhost:4200` for development.

### Token Storage
JWT tokens are stored in `localStorage` with keys:
- `access_token` - 10-minute expiry
- `refresh_token` - 7-day expiry
- `user` - User profile data

### Error Handling
The auth service provides meaningful error messages:
- Invalid credentials
- Email already exists
- Validation errors
- Network errors

## Testing

### Manual Testing
1. Register a new user
2. Login with credentials
3. Navigate to protected routes
4. Verify token in HTTP requests (DevTools Network tab)
5. Test logout functionality

### Test Credentials
Demo users are available in the in-memory database:
- `user@example.com` / `password` (user role)
- `admin@example.com` / `password` (admin role)

## Troubleshooting

### Port Already in Use
If port 8080 or 4200 is in use:

```powershell
# Find process on port
Get-NetTCPConnection -LocalPort 8080 | Select-Object OwningProcess

# Kill process
Stop-Process -Id <ProcessId>
```

### Auth Service Not Responding
Check if the service is running:

```powershell
# Check if running
Get-Process auth-server -ErrorAction SilentlyContinue

# Restart if needed
cd auth-service
.\auth-server.exe
```

### Angular Build Errors
Ensure Node.js version is compatible:

```powershell
node --version  # Should be v20.19 or higher
```

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add social login (Google, Microsoft)
- [ ] Enhanced profile management
- [ ] User settings page
- [ ] Activity logging
- [ ] Two-factor authentication (2FA)

## Resources

- [Auth Service Documentation](../auth-service/README.md)
- [Angular Documentation](https://angular.dev)
- [Material Design Components](https://material.angular.io)
- [JWT.io](https://jwt.io) - JWT token decoder
