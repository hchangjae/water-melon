import useTimeoutRef from '@/hooks/useTimeoutRef';
import { DOLLAR_INTERVAL, GetUserMeResponse } from '@/pages/api/user/me.page';
import { apiGet } from '@/utils/apiUtils';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { differenceInSeconds } from 'date-fns';

type Props = Partial<UseQueryOptions<GetUserMeResponse>>;

const useMe = (props?: Props) => {
  const timeout = useTimeoutRef();
  const queryClient = useQueryClient();
  const fetcher = async () => {
    const r = await apiGet('/api/user/me');
    if (!r) return r;

    const rest = DOLLAR_INTERVAL - (differenceInSeconds(new Date(), new Date(r.settledAt)) % DOLLAR_INTERVAL);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['useMe'] });
    }, rest * 1000);

    return r;
  };

  return useQuery({
    queryKey: ['useMe'],
    queryFn: fetcher,
    ...props,
  });
};

export default useMe;
