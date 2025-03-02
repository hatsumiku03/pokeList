"use client";
import Image from "next/image";
import { useState, useRef, useContext } from "react";
import useFetch from "./dataFetch/logic";
import Catch from "./ui/catch";
import PokemonList from "./ui/pokemonList";
import { PokemonContext } from "./context/sharePokemonForCatch";

export default function Home() {
  // | Importante, creo que acá podría omitir fortísimo el trueSearch, lo estaba
  // | usando para que no se me hiciera fetch cada vez que se escribía una letra
  // | pero creo que con el useEffect que tengo en el useFetch.js ya no es necesario
  // º Me dio pereza eliminarlo xD

  const search = useRef(null);
  const [trueSearch, setTrueSearch] = useState("");
  const { pokemonData, error } = useFetch(trueSearch);
  
  // | Definir la búsqueda
  function searchPokemon(){
    setTrueSearch(search.current.value);
  }
  
  // | Acá se usa el useContext para poder pasarle a los componetnes de captura y mostrar los bichos
  // | Las variables que uso acá xD
  // º Esto es mágia negra tío, como funciona esto solo definiendo el sharePokemonForCatch.js
  // º que en el pokemon provider le paso el children y ya puedo usarlo en cualquier componente, sigo creyendo el el duende mágico de mi ordenador con una rueda de hamster haciendo correrlo, y eso que ya he abierto 3 veces mi ordenador y no hay nada dentro
  const {state,dispatch} = useContext(PokemonContext);
  

    // | La vista de lo q se verá al user
      return(
        <div className="flex flex-col items-center justify-center mt-5">
            <div> 
              <h1>Pokedex de Joselito</h1>
            </div>
    
            <div className="flex mt-5 gap-2 flex-col w-fit">
              {/* Navegación */}
              <input className="border-2 bg-white" type="text" placeholder="Buscar Pokemon" ref={search} />
              <button className="cursor-pointer hover:bg-gray-400" onClick={searchPokemon}>Buscar</button>
            
            
            <div className="mt-5 gap-2 flex-col w-fit text-center">
              {/* Nombre */}
              {pokemonData && 
              trueSearch !== "" &&
              pokemonData.name}
    
              {/* Sprite del pokemon */}
              {pokemonData &&
              pokemonData.sprites &&
              trueSearch !== "" &&
              <Image src={pokemonData.sprites.front_default} alt="digimon" width={140} height={140}/>}
    
              {/* Peso */}
              {pokemonData &&
              pokemonData.weight && 
              trueSearch !== "" &&
              pokemonData.weight/10 +" kg"}
              
              {/* Tipos */}
              {pokemonData && 
              pokemonData.types && 
              trueSearch !== "" &&
              pokemonData.types.map((type, index) => <p key={index}>{type.type.name}</p>)}
    
              {/* Decirle al usuario q se equivoco al escribir */}
              {error && <p>{error}</p>}
    
              {/* Botoncico con la lógica de atrapar */}
                <div>
                  {pokemonData &&
                  trueSearch !== "" &&
                  !error &&
                  <Catch pokemon={pokemonData}/>}
                </div>
    
            </div>
            
            {/* Mostrar la listica de pokemon capturados */}
            <div className="mt-5">
              {pokemonData && <PokemonList/>}
            </div>
          </div>
          
        </div>
      );
    };
