import { PokemonProvider } from '@/context/PokemonContext';

export default function Home() {
  return (
    <PokemonProvider>
      <div></div>
    </PokemonProvider>
  );
}
