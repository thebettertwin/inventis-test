import { Button, DisplayPokemon } from '../src';
import { ChevronRight } from '../src/svgs';
import { Pokemon, SimplePokemon } from '../src/types';
import Image from 'next/image';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const callApi = async (offset = 0) => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${offset}`
    );
    const data = await res.json();
    return loadPokemonData(data);
  } catch (err) {
    console.log(err);
  }
}

type APIResponse = {
  results: [{ url: string }]
}

const loadPokemonData = async (data: APIResponse) => {
  const loadedPokemonData = data.results?.map(async result => {
    try {
      const res = await fetch(result.url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  const pokemon = Promise.all(loadedPokemonData);
  return buildPokemonData(pokemon);
}

type ExtendedPokemon = Pokemon & {
  sprites: { front_default: string }
}

const buildPokemonData = async (data: Promise<ExtendedPokemon[]>) => {
  const pokemonData = await data;
  const pokemonArray = pokemonData.map(pokemon => ({
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.sprites["front_default"],
    abilities: pokemon.abilities,
  }));

  return pokemonArray;
}


const loadMore = async (data: SimplePokemon[], setData: Dispatch<SetStateAction<SimplePokemon[] | undefined>>) => {
  const fetchData = await callApi(data.length) || [];
  setData([...data, ...fetchData]);
}


export default function Home() {
  const [data, setData] = useState<SimplePokemon[]>();
  useEffect(() => {
    const loadData = async () => {
      const fetchData = await callApi();
      setData(fetchData);
    }
    loadData();
  }, [])
  return (
    <main
      className="flex flex-col min-h-screen p-10 relative after:absolute after:-z-20 after:h-[300px] after:w-[800px]  after:rounded-full after:-translate-y-3/4 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-900/10 after:dark:from-orange-200 after:dark:via-orange-400/40"
    >

      <h1 className="font-extralight text-4xl">Select your <span className='font-semibold flex relative'>Pokémon <Image className="ml-[-0.75rem]" alt='Pokeball image' src="/pokeball.png" width="70" height="70" priority /></span></h1>
      <div className="my-10 grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-10 min-h-screen">
        {data && <DisplayPokemon pokemonData={data} />}
      </div>
      {data && <Button onClick={() => loadMore(data, setData)} buttonText="Catch more Pokémon" buttonImage={<Image alt='Pokeball image' src="/pokeball.png" width="70" height="70" />} buttonIcon={<ChevronRight
      />} />}
    </main>
  )
}
