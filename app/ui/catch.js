import { useContext } from "react";
import { PokemonContext } from "../context/sharePokemonForCatch";

const Catch = ({ pokemon }) => {
  const { dispatch } = useContext(PokemonContext);

  const catchPokemon = () => {
    dispatch({ type: "catch", payload: pokemon });
  };

  return <button className="hover:bg-gray-400 cursor-pointer" onClick={catchPokemon}>Atrapar</button>;
};

export default Catch;