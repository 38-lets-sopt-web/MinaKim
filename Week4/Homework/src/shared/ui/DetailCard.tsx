interface DetailCardProps {
  name: string;
  id: number;
  email: string;
  age: number;
  part: string;
}

export const DetailCard = ({name, id, email, age, part}: DetailCardProps) => {
  return (
    <div className='rounded-2xl bg-neutral-50 p-8 shadow-sm'>
      <ul className='flex flex-col gap-4'>
        <li className='flex border-b border-neutral-200 pb-2'>
          <p className='w-32 font-bold text-neutral-500'>이름</p>
          <p className='text-neutral-900'>{name}</p>
        </li>
        <li className='flex border-b border-neutral-200 pb-2'>
          <p className='w-32 font-bold text-neutral-500'>아이디</p>
          <p className='text-neutral-900'>{id}</p>
        </li>
        <li className='flex border-b border-neutral-200 pb-2'>
          <p className='w-32 font-bold text-neutral-500'>이메일</p>
          <p className='text-neutral-900'>{email}</p>
        </li>
        <li className='flex border-b border-neutral-200 pb-2'>
          <p className='w-32 font-bold text-neutral-500'>나이</p>
          <p className='text-neutral-900'>{age}세</p>
        </li>
        <li className='flex border-b border-neutral-200 pb-2'>
          <p className='w-32 font-bold text-neutral-500'>파트</p>
          <p className='text-neutral-900'>{part}</p>
        </li>
      </ul>
    </div>
  );
};
