import { useNavigate } from "react-router-dom";
import usePokemonStore from "../../store";

const NavBar = () => {
  const { searchData, setSearchData } = usePokemonStore();
  const navigate = useNavigate();
  return (
    <div>
      <nav className=" fixed top-0 right-0 left-0 flex w-full flex-wrap items-center justify-between  py-2 shadow-dark-mild dark:bg-emerald-500 lg:py-4 z-50">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <span className="cursor-pointer ms-2 text-xl text-black dark:text-white" onClick={()=>navigate("/")}>
            Pokemon
          </span>
          <div className="relative flex items-end w-[25%] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              placeholder="Search Pokémon"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              id="search"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
