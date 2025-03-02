"use client"
import { createContext, useReducer, useEffect } from "react";

// | Inicializar el estado del array donde se guarda to
const initialState = {
  PC: []
};

// | Reducer para meterle cosas al PC
const reducer = (state, action) => {
  switch (action.type) {

    // | Este cacharro se usa principalmente para la lista de pokemon que se capturan y se queden guardados en el pc, fin
    case "initialize":
        return {
          ...state,
          PC: action.payload
        };
    
    // | Condición para indicar q un bicho ta capturao
    case "catch":
    // º El if de acá es para que no se puedan repetir pokes capturados, lo quito y se puede xD
    if (state.PC.some(pokemon => pokemon.name === action.payload.name)) {
      return state;
      // @ No puse ningún mensaje de estado para decirle al user que ya tiene ese poke
      // @ Me dio mucho palo
    }
      return {
        ...state,
        PC: [...state.PC, action.payload]
      };
    // | Condición para liberar un pokemon
    case "release":
        return {
            ...state,
            PC: state.PC.filter((_, index) => index !== action.payload)
        };
    default:
      return state;
  }
};

// | Crear el contexto para compartir data de la página principal al resto de componentes
export const PokemonContext = createContext();

// | Lógica para compartir el estado de los pokemon capturados
export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // El useEffect se hace puramente para guardar en localStorage el estado del PC con los bichos capturaos
  useEffect(() => {
    const storedPC = localStorage.getItem("pokemonPC");
    if (storedPC) {
      dispatch({ type: "initialize", payload: JSON.parse(storedPC) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemonPC", JSON.stringify(state.PC));
  }, [state.PC]);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};