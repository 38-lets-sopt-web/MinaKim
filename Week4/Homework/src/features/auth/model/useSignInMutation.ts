import {useMutation} from '@tanstack/react-query';
import {authApi} from '@/shared/api/auth';
import {useNavigate} from 'react-router';
import type {SignInRequest, SignInResponseData} from '@/shared/api/schema';

export const useSignInMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignInRequest) => authApi.signIn(data),
    onSuccess: (response) => {
      const {userId} = response.data as SignInResponseData;

      localStorage.setItem('userId', String(userId));

      alert('로그인에 성공했습니다!');

      navigate('/mypage');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('아이디 또는 비밀번호를 확인해주세요.');
    },
  });
};
