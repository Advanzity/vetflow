import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Feature } from '../types';

export function useFeatureAccess(feature: Feature) {
  const { data: session } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!session?.user?.id) {
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/subscription/features/${feature}`);
        const { hasAccess } = await response.json();
        setHasAccess(hasAccess);
      } catch (error) {
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [session, feature]);

  return { hasAccess, isLoading };
}
