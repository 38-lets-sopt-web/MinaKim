interface CardProps {
  name: string;
  part: string;
  onClick?: () => void;
}

export const Card = ({name, part, onClick}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className='flex cursor-pointer flex-col items-center justify-center rounded-2xl bg-neutral-100 p-10'>
      <p className='text-h5'>{name}</p>
      <p className='text-body-l'>{part}</p>
    </div>
  );
};
