import { useContext } from "react";
import { PokemonContext } from "../context/sharePokemonForCatch";
import Image from "next/image";

const PokemonList = () => {
  const { state, dispatch } = useContext(PokemonContext);
  
  return (
    <div className="flex text-center mt-5 flex-col">
      <h2 className="text-3xl font-bold">PC de Oryza</h2>
      <ul>
        {state.PC.map((pokemon, index) => (
          <div className="flex flex-col justify-center items-center bg-neutral-400 rounded-full border-2 border-white mt-5" key={index}>
            <li>
              <span>{pokemon.name}</span>
              <Image src={pokemon.sprites.front_default} alt="bakugan_capturado" width={50} height={50}/>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer p-1 mt-2 mb-2" 
              onClick={() => dispatch({ type: "release", payload: index })}>Liberar</button>
            </li> 
          </div>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;