import { useEffect } from 'react';
import { setUserContext } from '../utils/errorHandler';

export const useSentryUser = (user: { id?: string; email?: string; username?: string } | null) => {
  useEffect(() => {
    if (user) {
      setUserContext(user);
    }
  }, [user]);
};
