import { STORAGE_KEYS } from "../../constants";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Mock authentication service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthTokens> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login
    const tokens: AuthTokens = {
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
      expiresIn: 3600, // 1 hour
    };

    // Store tokens
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);

    return tokens;
  },

  logout: async (): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Clear tokens
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  refreshToken: async (): Promise<AuthTokens> => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock token refresh
    const tokens: AuthTokens = {
      accessToken: `mock_access_token_refreshed_${Date.now()}`,
      refreshToken: `mock_refresh_token_refreshed_${Date.now()}`,
      expiresIn: 3600,
    };

    // Update stored tokens
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);

    return tokens;
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};
