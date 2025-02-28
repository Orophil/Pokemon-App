import { useEffect, useState } from "react";
import { useFetch } from "../../hooks";
import usePokemonStore from "../../store";
import NavBar from "../navbar/NavBar";
import Loader from "../../utils/Loader";
import ErrorComponentPage from "../../pages/ErrorComponentPage";
interface Pokemon {
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }, base_stat: number }[];
  moves: { move: { name: string } }[];
}
const DetailsComponent:React.FC = () => {
  const { pokemon } = usePokemonStore();
  const [pokemons, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);  
  const Url = `${import.meta.env.VITE_API_URL}/${pokemon?.id}`;
  const { fetchPokemon } = useFetch(Url);
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetchPokemon(Url);
      if (response.success) {
        setPokemon(response.data);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (pokemon?.id) {
      fetchPokemons();
    }
  }, [pokemon]);
  return (
    <div>
      <NavBar />
      {loading ? (
       <div className="flex items-center justify-center h-screen"> <Loader /></div>
      ) : (
        <div className="flex justify-center p-20">
          {pokemons?.sprites?.other?.dream_world?.front_default ? (
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full px-5 py-5"
                src={pokemons.sprites.other.dream_world.front_default}
                alt={pokemons.name}
              />
              <div className="px-6 py-4">
                <div className="uppercase font-extrabold text-center mb-2">{pokemons.name}</div>
                <div className=" flex justify-between text-gray-700 text-base">
                  <p><strong className="uppercase text-bold">Type</strong><br></br> {pokemons.types.map(type => type.type.name).join(", ")}</p>
                  <p><strong className="uppercase text-bold">Abilities</strong> <br></br>{pokemons.abilities.map(ability => ability.ability.name).join(", ")}</p>
                </div> <br></br>
                <div className="flex justify-between"> <div className="flex flex-col"><p><strong className="uppercase text-bold">Stats</strong></p>
            
                  <ul>
                    {pokemons.stats.map(stats => (
                      <li key={stats.stat.name}><span className="font-semibold">{stats.stat.name}:</span> {stats.base_stat}</li>
                    ))}
                  </ul></div>
                  <div className="flex flex-col"><p><strong className="uppercase text-bold">Moves</strong></p>
                  <ul>
                    {pokemons.moves.slice(0, 5).map(move => (
                      <li key={move.move.name}><span className="font-normal">{move.move.name}</span></li>
                    ))}
                  </ul></div>
                  </div>
                
              </div>
            </div>
          ) : (
            <div><ErrorComponentPage/></div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsComponent;
