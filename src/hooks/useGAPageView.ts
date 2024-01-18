import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trackPageView } from '@/utils/gaUtils';

const useGAPageView = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = trackPageView;

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export default useGAPageView;
