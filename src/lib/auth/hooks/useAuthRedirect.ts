import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface AuthRedirectOptions {
  redirectTo: string;
  redirectIfFound?: boolean;
}

export function useAuthRedirect({ redirectTo, redirectIfFound = false }: AuthRedirectOptions) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (
      (redirectIfFound && user) ||
      (!redirectIfFound && !user)
    ) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, redirectTo, redirectIfFound, navigate]);
}