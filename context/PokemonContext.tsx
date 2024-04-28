'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import { getPokemons, getPokemonByName } from '../utils/fetchPokemon';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextProps {
  pokemonList: Pokemon[] | null;
  error: string | null;
  isLoading: boolean;
  currentPage: number;
  currentPokemon: string | null;
  nextPage: () => void;
  prevPage: () => void;
  setInitialPage: (item: number) => void;
  selectedPokemon: (name: string | null) => void;
  pokemonDetail: any | null;
}

const initialState = {
  pokemonList: [],
  currentPokemon: null,
  error: null,
  isLoading: false,
  currentPage: 1,
  nextPage: () => {},
  prevPage: () => {},
  setInitialPage: (item: number) => {},
  selectedPokemon: (item: string | null) => {},
  pokemonDetail: null,
};

export const PokemonContext = createContext<PokemonContextProps>(initialState);

const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPokemon, setCurrentPokemon] = useState<string | null>(null);

  const [pokemonDetail, setPokemonDetail] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const selectedPokemon = (name: string | null) => {
    setCurrentPokemon(name);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const setInitialPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPokemonDetail = async (name: string) => {
    try {
      const data = await getPokemonByName(name);
      setPokemonDetail(data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      throw error;
    }
  };

  const getPokemonList = async (pageNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getPokemons(pageNumber);
      setPokemonList(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentPokemon) {
      return;
    }

    getPokemonDetail(currentPokemon);
  }, [currentPokemon]);

  useEffect(() => {
    if (!currentPage) {
      return;
    }
    router.push(
      pathname + '?' + createQueryString('pageNumber', String(currentPage)),
    );
    getPokemonList(currentPage);
  }, [currentPage]);

  const value = useMemo(() => {
    return {
      pokemonList,
      error,
      isLoading,
      currentPage,
      nextPage,
      prevPage,
      setInitialPage,
      selectedPokemon,
      pokemonDetail,
      currentPokemon,
    };
  }, [
    pokemonList,
    error,
    isLoading,
    currentPage,
    nextPage,
    prevPage,
    setInitialPage,
    selectedPokemon,
    pokemonDetail,
    currentPokemon,
  ]);

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('please use in PokemonProvider');
  }

  return context;
};

export { PokemonProvider, usePokemonContext };
