import { toast } from 'sonner';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI || 'http://localhost:5173/auth/github/callback';
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_API_URL = 'https://api.github.com';
const BACKEND_URL = 'http://localhost:3000';

// GitHub OAuth scopes
const GITHUB_SCOPES = ['user:email', 'read:user'];

export const initiateGitHubLogin = () => {
  if (!GITHUB_CLIENT_ID) {
    toast.error('GitHub OAuth is not configured properly. Please contact support.');
    return;
  }

  try {
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
      scope: GITHUB_SCOPES.join(' '),
    });

    const authUrl = `${GITHUB_AUTH_URL}?${params.toString()}`;
    window.location.href = authUrl;
  } catch (error) {
    toast.error('Failed to initiate GitHub login. Please try again.');
  }
};

const exchangeCodeForToken = async (code: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/github/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw error;
  }
};

const fetchGitHubUserData = async (accessToken: string) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user data');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const handleGitHubCallback = async (code: string) => {
  try {
    if (!code) {
      throw new Error('No authorization code received');
    }
    
    const response = await fetch(`${BACKEND_URL}/api/github/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Store auth token
    localStorage.setItem('auth_token', data.access_token);
    
    return data.user;
  } catch (error) {
    toast.error('Failed to authenticate with GitHub. Please try again.');
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('auth_token');
}; 