import { PokemonProvider } from '@/context/PokemonContext';
import Image from 'next/image';
import CollectionBox from '@/components/CollectionBox/CollectionBox';

export default function Home() {
  return (
    <PokemonProvider>
      <section className='w-full max-h-screen flex space-x-10 items-center overflow-hidden'>
        <div className='w-fit text-[64px] leading-[65px] font-bold text-white'>
          Explore, Collect, and Conquer: Your Ultimate Pokémon Companion with
          PokémonList!
        </div>

        <div className='flex items-center justify-center w-[800px] h-[800px]'>
          <Image
            src='/pokemoncollection.png'
            width={700}
            height={700}
            alt='Pokemon collection'
          />
        </div>
      </section>

      <section className='w-full rounded-xl  h-fit overflow-hidden'>
        <CollectionBox></CollectionBox>
      </section>
    </PokemonProvider>
  );
}
