'use client';

import { usePokemonContext } from '@/context/PokemonContext';
import NameCard from '../ui/NameCard';

const CollectionBox = () => {
  const { pokemonList } = usePokemonContext();
  return (
    <div className='flex flex-wrap  gap-5 items-center justify-center'>
      {pokemonList?.map((item) => (
        <div key={item.name}>
          <NameCard name={item.name} />
        </div>
      ))}
    </div>
  );
};

export default CollectionBox;
