import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

import { useState } from 'react';
const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = () => {
  const [currentPage, setCurrentPage] = useState<number>(3);
  return (
    <Pagination
      currentPage={currentPage}
      numberOfPage={5}
      handleNext={() => {
        if (currentPage < 5) {
          setCurrentPage((prev) => prev + 1);
        }
      }}
      handlePrev={() => {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      }}
      handleSelectPage={(item) => {
        setCurrentPage(item);
      }}
    />
  );
};
