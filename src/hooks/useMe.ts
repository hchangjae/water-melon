import { GetUserMeResponse } from '@/pages/api/user/me.page';
import { apiGet } from '@/utils/apiUtils';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type Props = Partial<UseQueryOptions<GetUserMeResponse>>;

const useMe = (props?: Props) => {
  const fetcher = () => apiGet('/api/user/me');

  return useQuery({
    queryKey: ['useMe'],
    queryFn: fetcher,
    ...props,
  });
};

export default useMe;
