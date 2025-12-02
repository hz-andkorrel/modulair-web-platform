# Authentication Frontend - Hotel Hub

Angular authentication and authorization frontend for the Hotel Hub modulair web platform.

## Features

- ✅ **Login & Registration** - Complete authentication flow
- ✅ **JWT Token Management** - Secure token storage and handling
- ✅ **Protected Routes** - Auth guard preventing unauthorized access
- ✅ **HTTP Interceptor** - Automatic JWT token injection in requests
- ✅ **User Profile Menu** - Display user info with logout functionality
- ✅ **Material Design** - Modern, responsive UI

## Prerequisites

- Node.js v20.19 or higher (tested with v24.11.1)
- npm v11.6+
- **Backend**: Auth-service running on `http://localhost:8080` (see backend team)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### 3. Login with Demo Credentials

```
Email: user@example.com
Password: password
```

## Backend Integration

This frontend connects to the auth-service backend API:
- **API URL**: `http://localhost:8080`
- **Endpoints**: `/auth/login`, `/auth/register`, `/auth/logout`

Make sure the auth-service backend is running before starting the frontend. Contact the backend team for setup instructions.

Make sure the auth-service backend is running before starting the frontend. Contact the backend team for setup instructions.

## Project Structure

```
src/app/
├── core/
│   ├── guards/          # Auth guard for route protection
│   ├── interceptors/    # HTTP interceptor for JWT tokens
│   ├── models/          # User and auth interfaces
│   └── services/        # Authentication service
├── features/
│   └── auth/            # Login & register components
└── shared/
    └── sidebar/         # Navigation with user menu
```

## Configuration

Update API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

## Building for Production

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Documentation

For detailed authentication flow and API documentation, see [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md).

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material Components](https://material.angular.io)
