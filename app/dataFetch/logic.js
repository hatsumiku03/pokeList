"use client";
import { useEffect, useState} from "react";

// | Hook personalizao, useEffect bien sencillico que luego se utiliza en la página principal
const useFetch = (pokemonName) => {
    const [error, setError] = useState("");
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
      if(pokemonName){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            setPokemonData(data);
            setError("");
          })
          .catch((error) => {
            setPokemonData(null);
            setError("Pon bien el nombre del nexomon");
          });
      }
    }, [pokemonName]);

    return {pokemonData, error};
}

export default useFetch;