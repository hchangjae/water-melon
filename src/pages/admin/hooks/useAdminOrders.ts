import { apiGet } from '@/utils/apiUtils';
import { useQuery } from '@tanstack/react-query';

const useAdminOrders = () => {
  const fetcher = () => apiGet('/api/admin/order');
  return useQuery({
    queryKey: ['useAdminOrders'],
    queryFn: fetcher,
    refetchInterval: 3000,
  });
};

export default useAdminOrders;
