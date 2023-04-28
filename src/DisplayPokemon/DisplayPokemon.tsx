import Link from "next/link";
import Image from 'next/image';
import React from "react";
import { SimplePokemon } from "../types";

type DisplayPokemonProps = {
    pokemonData: SimplePokemon[];
}

const DisplayPokemon: React.FC<DisplayPokemonProps> = ({ pokemonData }) => {
    return <>
        {pokemonData.map(pokemon => {
            return (
                <Link
                    key={`${pokemon.name}-key`}
                    href={{
                        pathname: "/pokemon/[pokemon]",
                        query: { pokemonData: JSON.stringify(pokemon) },
                    }}
                    as={`/pokemon/${pokemon.name}/`}
                >
                    <figure className=
                        "group flex flex-col items-center p-5 text-center rounded-2xl bg-gray-900/10 dark:bg-white/10 hover:ring-2 hover:cursor-pointer hover:bg-white/90 ring-orange-600 transition-all duration-500 opacity-70 hover:opacity-100"
                        key={pokemon.id}>
                        <Image alt={pokemon.name + ' image'} src={pokemon.image} width="150" height="150" />
                        <figcaption className="capitalize font-bold group-hover:text-orange-600 transition-all duration-500">
                            {pokemon.name}
                        </figcaption>
                    </figure>
                </Link>
            )
        })}
    </>
}

export default DisplayPokemon;