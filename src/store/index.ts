import { create } from 'zustand';
import { Pokemon } from '../types';
interface PokemonStore {
    pokemon: Pokemon | null;
    searchData: string;
    setPokemon: (pokemon: Pokemon) => void;
    setSearchData: (searchData: string) => void;
}
const usePokemonStore = create<PokemonStore>((set) => ({
    pokemon: null,
    searchData: "",
    setPokemon: (pokemon) => set({ pokemon }),
    setSearchData: (searchData) => set({ searchData }),
}));
export default usePokemonStore;
