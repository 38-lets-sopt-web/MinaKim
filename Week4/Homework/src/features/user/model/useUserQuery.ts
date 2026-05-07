import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {userApi} from '@/shared/api/user';
import type {User, UserUpdateRequest} from '@/shared/api/schema';

export const useUserQuery = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId),
    enabled: !!userId && !isNaN(userId),
    select: (response): User => response.data as User,
  });
};

export const useUserMemberList = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: () => userApi.getUserList(),
    select: (response): User[] => response.data.users as User[],
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({userId, data}: {userId: number; data: UserUpdateRequest}) =>
      userApi.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
      alert('정보가 성공적으로 수정되었습니다.');
    },
    onError: () => {
      alert('정보 수정 중 오류가 발생했습니다.');
    },
  });
};
