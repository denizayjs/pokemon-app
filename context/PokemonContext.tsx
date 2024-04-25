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
import axios from 'axios';
import { getPokemons } from '../utils/fetchPokemon';
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
  nextPage: () => void;
  prevPage: () => void;
  setInitialPage: (item: number) => void;
}

const initialState = {
  pokemonList: [],
  error: null,
  isLoading: false,
  currentPage: 1,
  nextPage: () => {},
  prevPage: () => {},
  setInitialPage: (item: number) => {},
};

export const PokemonContext = createContext<PokemonContextProps>(initialState);

const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getPokemonList = async (pageNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getPokemons(pageNumber);
      setPokemonList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const pageNumber = searchParams.get('pageNumber');

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const setInitialPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
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
    };
  }, [
    pokemonList,
    error,
    isLoading,
    currentPage,
    nextPage,
    prevPage,
    setInitialPage,
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
