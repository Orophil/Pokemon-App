import { useEffect, useState } from "react";
import { useFetch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import "./HomePage.css";
import usePokemonStore from "../../store";
import Loader from "../../utils/Loader";
import ErrorComponentPage from "../../pages/ErrorComponentPage";
const Homepage: React.FC = () => {
  const url = `${import.meta.env.VITE_API_URL}/?limit=2000`;
  interface Pokemon {
    id: number;
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
    height: number;
    weight: number;
    stats: { base_stat: number }[];
  }
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(16);
  const [loading, setLoading] = useState<boolean>(false);
  const { setPokemon, searchData } = usePokemonStore();
  const navigate = useNavigate();
  const { fetchPokemon } = useFetch(url);
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetchPokemon(url);
      if (response.success) {
        const detailedPokemonData = await Promise.all(
          response.data.results.map(async (Pokemon: { url: string }) => {
            const res = await fetch(Pokemon.url);
            const data = await res.json();
            return data;
          })
        );
        setPokemonData(detailedPokemonData);
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
    fetchPokemons();
  }, []);
  const filteredPokemonData = pokemonData.filter((Pokemon) =>
    Pokemon.name.toLowerCase().includes(searchData.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemonData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPokemonData.length / itemsPerPage);
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };
  const handleDetails = (pokemon: Pokemon) => {
    setPokemon(pokemon);
    navigate("/details-page");
  };
  return (
    <div>
      <NavBar />
      <div className="py-[10rem] px-5 z-0">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        ) : filteredPokemonData.length === 0 ? (
          <ErrorComponentPage />
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center">
              {currentItems.map((Pokemon) => (
                <li
                  key={Pokemon.name}
                  onClick={() => {
                    handleDetails(Pokemon);
                  }}
                  className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
                >
                  <div className="w-full h-80 flex flex-col justify-between rounded overflow-hidden shadow-lg">
                    <img
                      className="w-full h-40 object-contain"
                      src={Pokemon.sprites.other.dream_world.front_default}
                      alt={Pokemon.name}
                    />
                    <div className="px-6 py-4 flex flex-col justify-between h-full">
                      <div>
                        <div className="font-bold text-center text-xl mb-2">
                          {Pokemon.name}
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center sm:justify-between md:justify-center lg:justify-between gap-2 text-center sm:text-left">
                        <p>
                          <span className="uppercase font-bold">Height:</span>
                          {Pokemon?.height}
                        </p>
                        <p>
                          <span className="uppercase font-bold">Weight:</span>
                          {Pokemon.weight}
                        </p>
                        <p>
                          <span className="uppercase font-bold">Speed:</span>
                          {Pokemon.stats[5].base_stat}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="mx-4 my-auto">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
