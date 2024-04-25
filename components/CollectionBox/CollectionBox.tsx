'use client';

import { usePokemonContext } from '@/context/PokemonContext';
import NameCard from '../ui/NameCard';
import Pagination from '../ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const CollectionBox = () => {
  const { pokemonList, currentPage, nextPage, prevPage, setInitialPage } =
    usePokemonContext();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get('pageNumber');

  useEffect(() => {
    if (pageNumber) {
      setInitialPage(Number(pageNumber));
    }
  }, []);

  return (
    <div className='flex flex-wrap  gap-5 items-center justify-center'>
      {pokemonList?.map((item) => (
        <div key={item.name}>
          <NameCard name={item.name} />
        </div>
      ))}
      <Pagination
        numberOfPage={10}
        currentPage={currentPage}
        onNext={() => {
          if (currentPage < 10) {
            nextPage();
          }
        }}
        onPrev={() => {
          if (currentPage > 1) {
            prevPage();
          }
        }}
        onSelectPage={(item: number) => {
          setInitialPage(item);
        }}
      />
    </div>
  );
};

export default CollectionBox;
