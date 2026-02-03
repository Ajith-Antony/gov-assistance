// Route Paths
export const ROUTES = {
  ROOT: "/",
  LANG: "/:lang",
  HOME: "/:lang/home",
  APPLY_DONE: "/:lang/apply/done",
  APPLY_STEP: "/:lang/apply/:step",
  LANG_WILDCARD: "/:lang/*",
  WILDCARD: "*",
} as const;

// Step Identifiers
export const STEPS = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third",
} as const;

// Supported Languages
export const LANGUAGES = {
  ENGLISH: "en",
  ARABIC: "ar",
} as const;

export const SUPPORTED_LANGUAGES = [LANGUAGES.ENGLISH, LANGUAGES.ARABIC] as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  FORM_ONE_DATA: "gov-support-form-one",
  FORM_TWO_DATA: "gov-support-form-two",
  FORM_THREE_DATA: "gov-support-form-three",
  CURRENT_STEP: "gov-support-current-step",
  AUTH_TOKEN: "gov-support-auth-token",
  REFRESH_TOKEN: "gov-support-refresh-token",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AI_GENERATE: "https://ai-microservice-gamma.vercel.app/api/generate.js",
  AUTH_LOGIN: "/api/auth/login",
  AUTH_REFRESH: "/api/auth/refresh",
  AUTH_LOGOUT: "/api/auth/logout",
  COUNTRIES: "https://countriesnow.space/api/v0.1/countries",
  STATES: "https://countriesnow.space/api/v0.1/countries/states",
  CITIES: "https://countriesnow.space/api/v0.1/countries/state/cities",
} as const;

// Timeout Values (in milliseconds)
export const TIMEOUTS = {
  AI_REQUEST: 15000, // 15 seconds
  AUTO_SAVE_DEBOUNCE: 500, // 500ms
  API_REQUEST: 30000, // 30 seconds
} as const;

// Error Codes
export const ERROR_CODES = {
  AI_REQUEST_FAILED: "AI_REQUEST_FAILED",
  AI_TIMEOUT: "AI_TIMEOUT",
  AUTH_FAILED: "AUTH_FAILED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  NETWORK_ERROR: "NETWORK_ERROR",
} as const;

// Form Field Components
export const FIELD_COMPONENTS = {
  TEXT_FIELD: "TextField",
  SELECT: "Select",
  DATE_PICKER: "DatePicker",
  TEXT_AREA_WITH_AI: "TextAreaWithAI",
  PHONE_INPUT: "PhoneInput",
  COUNTRY_CITY_SELECT: "CountryCitySelect",
  MONEY_INPUT: "MoneyInput",
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{8,15}$/,
} as const;

// Currency Codes
export const CURRENCIES = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  AED: "AED",
  SAR: "SAR",
  INR: "INR",
} as const;

export const SUPPORTED_CURRENCIES = [
  { code: CURRENCIES.USD, symbol: "$", name: "US Dollar" },
  { code: CURRENCIES.EUR, symbol: "€", name: "Euro" },
  { code: CURRENCIES.GBP, symbol: "£", name: "British Pound" },
  { code: CURRENCIES.AED, symbol: "د.إ", name: "UAE Dirham" },
  { code: CURRENCIES.SAR, symbol: "﷼", name: "Saudi Riyal" },
  { code: CURRENCIES.INR, symbol: "₹", name: "Indian Rupee" },
] as const;

// Countries
export const COUNTRIES = {
  UAE: "ae",
  USA: "us",
  UK: "uk",
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Auto-save Status
export const AUTO_SAVE_STATUS = {
  IDLE: "idle",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
} as const;
