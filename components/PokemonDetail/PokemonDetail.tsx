'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { usePokemonContext } from '@/context/PokemonContext';
import { useEffect } from 'react';

const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const { selectedPokemon, pokemonDetail } = usePokemonContext();

  useEffect(() => {
    if (pokemonName) {
      selectedPokemon(String(pokemonName));
    }
  }, [pokemonName]);

  return (
    <div className='bg-white w-[300px] rounded-xl p-6'>
      <div>
        <Image
          width={300}
          height={300}
          src={pokemonDetail?.sprites.front_default}
          alt={pokemonDetail?.name}
          priority
        />
      </div>
      <div className='w-full text-center font-medium text-lg'>
        {pokemonDetail?.name.toUpperCase()}
      </div>
      <div className='w-full mt-4 flex justify-center space-x-2'>
        <span className='px-4 py-2 bg-red-500 text-white font-medium w-fit rounded-xl'>
          {pokemonDetail?.weight / 10} kg
        </span>
        <span className='px-4 py-2 bg-green-500 text-white font-medium w-fit rounded-xl'>
          {pokemonDetail?.height / 10} m
        </span>
      </div>
    </div>
  );
};

export default PokemonDetail;
