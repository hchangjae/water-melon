import { apiGet } from '@/utils/apiUtils';
import { useQuery } from '@tanstack/react-query';

const useAdminUsers = () => {
  const fetcher = () => apiGet('/api/admin/user');
  return useQuery({
    queryKey: ['useAdminUsers'],
    queryFn: fetcher,
    refetchInterval: 1000,
  });
};

export default useAdminUsers;
