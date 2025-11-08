import React, { useEffect, useState } from "react";
import "./App.css";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      const promises = [];
      for (let i = 1; i <= 20; i++) {
        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) =>
            res.json()
          )
        );
      }
      const results = await Promise.all(promises);
      setPokemonList(results);
      setLoading(false);
    }
    fetchPokemon();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pokedex-container">
      {pokemonList.map((pokemon) => {
        const imgSrc = pokemon.sprites.front_default;
        return (
          <div key={pokemon.id} className="pokemon-card">
            {imgSrc && (
              <img src={imgSrc} alt={pokemon.name} className="pokemon-image" />
            )}
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Pokedex;
