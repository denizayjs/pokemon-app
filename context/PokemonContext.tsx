'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import axios from 'axios';
import { getPokemons } from '../utils/fetchPokemon';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextProps {
  pokemonList: Pokemon[] | null;
  error: string | null;
  isLoading: boolean;
}

const initialState = {
  pokemonList: [],
  error: null,
  isLoading: false,
};

export const PokemonContext = createContext<PokemonContextProps>(initialState);

const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemonList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getPokemons();
      setPokemonList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  const value = useMemo(() => {
    return {
      pokemonList,
      error,
      isLoading,
    };
  }, [pokemonList, error, isLoading]);

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
