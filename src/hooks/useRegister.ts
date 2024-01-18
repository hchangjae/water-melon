import { PostUserMeRequest } from '@/pages/api/user/me.page';
import { apiPost } from '@/utils/apiUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useRegister = () => {
  const router = useRouter();
  const { referrer } = router.query;
  const queryClient = useQueryClient();
  const fetcher = (params: PostUserMeRequest['body']) => apiPost('/api/user/me', { ...params, ...(referrer && { referrer: Number(referrer) }) });

  return useMutation({
    mutationKey: ['useRegister'],
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useMe'] });
    },
  });
};

export default useRegister;
