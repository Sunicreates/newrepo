import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function GitHubCallback() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    
    if (code) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/github`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            setToken(data.token);
            setUser(data.user);
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        })
        .catch(() => {
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [navigate, setUser, setToken]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
} 