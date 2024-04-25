'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
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
  pokemonList: null,
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

  return (
    <PokemonContext.Provider value={{ pokemonList, error, isLoading }}>
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    return;
  }

  return context;
};

export { PokemonProvider, usePokemonContext };
