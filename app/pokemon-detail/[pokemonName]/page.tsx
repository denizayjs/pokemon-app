import PokemonDetail from '@/components/PokemonDetail/PokemonDetail';

export const metadata = {
  title: 'Pokemon Detail',
};

export default function AIFocus() {
  return (
    <div className='mt-20 w-full flex items-start justify-center'>
      <PokemonDetail />
    </div>
  );
}
