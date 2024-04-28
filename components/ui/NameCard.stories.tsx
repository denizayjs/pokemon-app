import type { Meta, StoryObj } from '@storybook/react';
import NameCard from './NameCard';

const meta: Meta<typeof NameCard> = {
  title: 'NameCard',
  component: NameCard,
};

export default meta;

export const Default = () => {
  const handleSelectName = (item: string) => {
    console.log(`Selected name: ${item}`);
  };

  return <NameCard name='John Doe' handleSelect={handleSelectName} />;
};
