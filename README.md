# React Multi-Step Form with AI Assistance

A multi-step form application built with **React**, **MUI**, and **React Hook Form**, featuring **OpenAI GPT integration** for AI-assisted text areas, **authentication system**, **multi-language support**, and **accessibility**.

---

## Features

### Core Features
- Multi-step form with validation
- AI-assisted text generation for text areas
- Persistent form data via `localStorage`
- English & Arabic support with RTL layout
- Accessible inputs with ARIA attributes
- Responsive design using Material UI
- Success/Error submission pages
- 404 page

### Authentication & Security
- **Session-based authentication** with token management
- **Login modal** overlay on app startup
- **Axios interceptors** for automatic token injection
- **Automatic token refresh** on 401 errors
- **Session storage** for secure token handling
- Mock authentication (username: `admin`, password: `admin`)

### API Integration
- **Axios-based HTTP client** with centralized configuration
- **Request/response interceptors** for auth token management
- **Automatic retry logic** for failed requests during token refresh
- **Error handling** with proper HTTP status code management

---

## Folder Structure

```
src/
├─ components/
│  ├─ Forms/              # Form input components
│  ├─ LoginModal/         # Authentication modal
│  ├─ NavigationBar/      # App navigation
│  └─ ErrorBoundary/      # Error handling
├─ hooks/                 # Custom hooks (useAutoSave, etc.)
├─ pages/                 # Page components (Home, Forms, Status, 404)
├─ services/
│  ├─ api/
│  │  ├─ authService.ts   # Authentication service
│  │  ├─ axiosInstance.ts # Configured axios instance
│  │  └─ interceptors.ts  # Request/response interceptors
│  ├─ generateAIText.ts   # AI text generation (uses axios)
│  └─ locationService.ts  # Location/country services
├─ theme/                 # MUI theme and RTL support
├─ i18n/                  # Internationalization setup
├─ constants/             # App constants and config
├─ App.tsx
├─ main.tsx
└─ routes.tsx
```

---

## Setup & Running

### 1. Clone and install dependencies

```bash
git clone https://github.com/Ajith-Antony/gov-assistance
cd gov-assistance
npm install
```

### 2. Add OpenAI API key

Create `.env` file in root:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> **Note:** Must use `VITE_` prefix to access environment variables in Vite.

### 3. Start development server

```bash
npm run dev
```

### 4. Login to the application

When you first load the app, you'll see a login modal:

- **Username:** `admin`
- **Password:** `admin`

The authentication token will be stored in session storage and automatically included in all API requests.

---

## Authentication System

### How It Works

1. **Login Modal:** On app startup, if no valid session token exists, a modal overlay appears requiring login
2. **Token Storage:** Upon successful login, access and refresh tokens are stored in `sessionStorage`
3. **Automatic Token Injection:** Axios interceptors automatically add the `Authorization: Bearer <token>` header to all requests
4. **Token Refresh:** If a request returns 401 (Unauthorized), the system automatically attempts to refresh the token
5. **Request Queuing:** During token refresh, failed requests are queued and retried after successful refresh

### Auth Service API

```typescript
// Login
await authService.login({ username: 'admin', password: 'admin' });

// Logout
await authService.logout();

// Check authentication status
const isAuth = authService.isAuthenticated();

// Get tokens
const accessToken = authService.getAccessToken();
const refreshToken = authService.getRefreshToken();
```

### Session Storage Keys

- `gov-support-auth-token` - Access token
- `gov-support-refresh-token` - Refresh token

---

## API Integration with Axios

All API calls use the centralized axios instance with automatic authentication:

```typescript
import axiosInstance from './services/api/interceptors';

// GET request
const response = await axiosInstance.get('/api/endpoint');

// POST request
const response = await axiosInstance.post('/api/endpoint', { data });
```

### Features

- **Automatic auth token injection** via request interceptors
- **Automatic token refresh** on 401 errors
- **Request queuing** during token refresh to prevent race conditions
- **Centralized timeout configuration** (30s for API requests, 15s for AI)
- **Consistent error handling** across all requests

---

## Architectural Decisions

### React + React Hook Form
Handles form state and validation in a declarative manner with minimal re-renders.

### MUI (Material UI)
Provides ready-to-use, accessible, and customizable components such as buttons, inputs, dialogs, etc.

### i18next
Used for multi-language support, handling English and Arabic translations along with RTL layout for Arabic.

### Axios with Interceptors
Centralized HTTP client with automatic authentication token management, request/response transformation, and error handling.

### Session Storage for Auth
Tokens are stored in `sessionStorage` (cleared on tab close) rather than `localStorage` for improved security.

### AI Text Generation
The `generateAIText` function uses axios to communicate with the OpenAI API, benefiting from automatic auth token injection.

### Persistent Form Data
Form data is stored in the browser's `localStorage` to allow users to resume filling out the form.

### Language-Aware Routing
Paths like `/:lang/home` and `/:lang/apply/:step` enable multi-language support throughout the application.

---

## Testing

The application includes comprehensive tests for:
- Components (forms, navigation, modals)
- Hooks (auto-save, form state)
- Services (auth, API calls)
- Pages (home, forms, status)

Run tests with:

```bash
npm test
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI text generation | Yes |

---

## License

MIT
