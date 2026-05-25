interface CardProps {
  label: string;
  message: string | number;
}

export const Card = ({label, message}: CardProps) => {
  return (
    <div className='bg-primary-100 flex flex-col items-center justify-between rounded-2xl p-2'>
      <h2 className='text-h2'>{label}</h2>
      <span className='text-h1'>{message}</span>
    </div>
  );
};
