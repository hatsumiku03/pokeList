import { useContext } from "react";
import { PokemonContext } from "../context/sharePokemonForCatch";

// | Componente pa' atrapar pals de esos del yu-gi-oh
const Catch = ({ pokemon }) => {
  // | Llamas al useContext
  const { dispatch } = useContext(PokemonContext);

  // | Llamas a catch del switch cases xd
  const catchPokemon = () => {
    dispatch({ type: "catch", payload: pokemon });
  };

  // | Botón mágico
  return <button className="hover:bg-gray-400 cursor-pointer" onClick={catchPokemon}>Atrapar</button>;
};

export default Catch;