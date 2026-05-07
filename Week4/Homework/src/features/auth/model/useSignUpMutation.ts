import {authApi} from '@/shared/api/auth';
import type {SignUpRequest} from '@/shared/api/schema';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router';

export const useSignUpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignUpRequest) => authApi.signUp(data),
    onSuccess: () => {
      alert('회원가입에 성공했습니다!');
      navigate('/login');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    },
  });
};
