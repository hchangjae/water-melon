import { PostOrderRequest } from '@/pages/api/order.page';
import { apiPost } from '@/utils/apiUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useOrder = () => {
  const queryClient = useQueryClient();
  const fetcher = (params: PostOrderRequest['body']) => apiPost('/api/order', params);
  return useMutation({
    mutationKey: ['useOrder'],
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useMe'] });
    },
  });
};

export default useOrder;
