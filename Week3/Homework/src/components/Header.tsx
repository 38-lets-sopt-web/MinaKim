import {Button} from '@/components/Button';

interface HeaderProps {
  activeTab: 'game' | 'ranking';
  onTabChange: (tab: 'game' | 'ranking') => void;
}

export const Header = ({activeTab, onTabChange}: HeaderProps) => {
  return (
    <header className='bg-primary-100 flex flex-row items-center justify-center gap-5 rounded-[10px] px-10 py-4'>
      <h1 className='text-h1'>두더지 게임</h1>
      <div className='flex gap-2'>
        <Button
          text='게임'
          backgroundColor={
            activeTab === 'game' ? 'bg-primary-500' : 'bg-neutral-200'
          }
          textColor={activeTab === 'game' ? 'text-white' : 'text-neutral-900'}
          onClick={() => onTabChange('game')}
        />
        <Button
          text='랭킹'
          backgroundColor={
            activeTab === 'ranking' ? 'bg-primary-500' : 'bg-neutral-200'
          }
          textColor={
            activeTab === 'ranking' ? 'text-white' : 'text-neutral-900'
          }
          onClick={() => onTabChange('ranking')}
        />
      </div>
    </header>
  );
};
