import {useUpdateUser, useUserQuery} from '@/features/user/model/useUserQuery';
import type {UserUpdateRequest} from '@/shared/api/schema';
import {Button} from '@/shared/ui/Button';
import {Input} from '@/shared/ui/Input';
import {useEffect, useRef, useState} from 'react';

export default function MyPage() {
  const userId = Number(localStorage.getItem('userId'));

  const [formData, setFormData] = useState<UserUpdateRequest>({
    name: '',
    email: '',
    age: 0,
  });
  const initialized = useRef<boolean>(false);

  const {data: user, isLoading} = useUserQuery(userId);
  const {mutate: updateInfo, isPending} = useUpdateUser();

  useEffect(() => {
    if (!user || initialized.current) return;
    initialized.current = true;
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserUpdateRequest
  ) => {
    const value =
      e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({...prev, [field]: value}));
  };

  const handleUpdate = () => {
    if (!userId) return;
    updateInfo({userId, data: formData});
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <section className='flex flex-col items-center justify-center gap-5 p-5'>
      <h1 className='text-h1'>내 정보</h1>
      <ul className='w-full max-w-md rounded-lg bg-neutral-100 p-4'>
        <li className='flex justify-between border-b py-2'>
          <p className='font-bold'>아이디</p>
          <p>{user?.loginId}</p>
        </li>
        <li className='flex justify-between py-2'>
          <p className='font-bold'>파트</p>
          <p>{user?.part}</p>
        </li>
      </ul>
      <div className='flex w-full max-w-md flex-col gap-4'>
        <Input
          label='이름'
          value={formData.name ?? ''}
          onChange={(e) => handleChange(e, 'name')}
        />
        <Input
          label='이메일'
          value={formData.email ?? ''}
          onChange={(e) => handleChange(e, 'email')}
        />
        <Input
          label='나이'
          type='number'
          value={formData.age ?? 0}
          onChange={(e) => handleChange(e, 'age')}
        />
      </div>
      <Button
        text={isPending ? '수정 중...' : '정보 수정'}
        backgroundColor='bg-primary-500'
        textColor='text-neutral-100'
        onClick={handleUpdate}
        disabled={isPending}
      />
    </section>
  );
}
