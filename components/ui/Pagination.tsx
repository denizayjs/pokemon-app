import { useMemo } from 'react';
import { cn } from '@/utils/classnames';

type PaginationProps = {
  currentPage: number;
  numberOfPage: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleSelectPage: (item: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const {
    currentPage,
    numberOfPage,
    handleNext,
    handlePrev,
    handleSelectPage,
  } = props;

  const pageList = useMemo(() => {
    var result = [];

    for (var i = 1; i <= numberOfPage; i++) {
      result.push(i);
    }
    return result;
  }, [numberOfPage]);

  return (
    <div className='bg-inherit flex items-center justify-center h-fit'>
      <div className='max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-sm'>
        <div className='flex justify-center'>
          <nav className='flex space-x-2' aria-label='Pagination'>
            <button
              onClick={handlePrev}
              className='relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-500 to-indigo-500 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10'
            >
              Previous
            </button>

            {pageList.map((item) => (
              <span
                onClick={() => {
                  handleSelectPage(item);
                }}
                key={item}
                className={cn(
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10',
                  { 'bg-fuchsia-200': item === currentPage },
                )}
              >
                {item}
              </span>
            ))}

            <button
              onClick={handleNext}
              className='relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-500 to-indigo-500 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10'
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
