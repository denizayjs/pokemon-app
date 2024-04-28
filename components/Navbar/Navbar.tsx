'use client';

import Logo from '@/assets/Logo';
import { usePokemonContext } from '@/context/PokemonContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { selectedPokemon, currentPokemon, currentPage } = usePokemonContext();
  const router = useRouter();
  return (
    <div className='sticky top-10 flex w-full items-center justify-around px-6 py-2 space-x-4 h-20 rounded-xl backdrop-blur-md bg-white/10'>
      <div className='flex items-center w-fit'>
        <Logo />
        <span className='font-bold text-2xl text-white'>Pokemon APP</span>
      </div>

      {currentPokemon && (
        <span
          className='border px-2 w-fit py-1 hover:bg-white hover:text-black cursor-pointer border-white text-white text-lg font-normal rounded-xl'
          onClick={() => {
            router.push(`/?pageNumber=${currentPage}`);
            selectedPokemon(null);
          }}
        >
          Back
        </span>
      )}
    </div>
  );
};

export default Navbar;
