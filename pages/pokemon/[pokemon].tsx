// TODO: handle refresh on the dynamic pages

import { useRouter } from "next/router";
import Image from 'next/image';
import Link from "next/link";

import { Toggle, AbilitiesChip } from '../../src';
import { useEffect, useState } from 'react';
import { Home } from "../../src/svgs";
import { Pokemon, YodaTranslation } from "../../src/types";


const fetchEffects = async (url: string) => {
    try {
        const res = await fetch(
            url
        );
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

const loadTranslations = async (effectData: string) => {
    try {
        const res = await fetch(`https://api.funtranslations.com/translate/yoda.json?text=${effectData}`)
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export default function PokemonDetailsPage() {
    const router = useRouter()
    const {
        query: { pokemonData },
    } = router
    const pokemon = JSON.parse(pokemonData as string);
    const [effectData, setEffectData] = useState<Pokemon[]>([]);
    const [enabled, setEnabled] = useState(false);
    const [yodaData, setYodaData] = useState<YodaTranslation[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const loadedAbilitiesData = pokemon.abilities.map(async (element: Pokemon) => await fetchEffects(element.ability.url));
            const abilities = await Promise.all(loadedAbilitiesData);
            setEffectData(abilities);
        }

        if (!effectData.length) loadData();

        const loadYodaData = async () => {
            const effectData = formatEffectData.map(async effect => await loadTranslations(JSON.stringify(effect)));
            const yodaEffects = await Promise.all(effectData);
            if (yodaEffects.every(effect => !effect?.error)) setYodaData(yodaEffects);
        }

        if (enabled) loadYodaData();
    }, [enabled]);

    const formatEffectData =
        effectData.map(element => element.effect_entries.filter(effect_entry => effect_entry.language.name === 'en')[0].effect)

    const onChange = () =>
        setEnabled(val => !val);


    return (
        <div className="flex flex-col min-h-screen">
            <nav className="flex items-center justify-between p-4">
                <Link href="/"><Home /></Link>
                <div className="flex items-center font-extralight">
                    Language:
                    <Image className="opacity-90" alt='Mandolorian helmet image for English language' src="/mando.png" width="50" height="50" />
                    <Toggle enabled={enabled} onChange={onChange} />
                    <Image className="mx-2 self-center" alt='Grogu image for Yoda language' src="/grogu.png" width="40" height="40" />
                </div>
            </nav>
            <article className="flex flex-col mx-auto max-w-2xl items-center after:absolute after:-z-20 after:h-[300px] after:w-[800px]  after:rounded-full after:-translate-y-3/4 after:left-1/4 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-900/10 after:dark:from-orange-200 after:dark:via-orange-400/40">
                <Image alt={pokemon.name + ' image'} src={pokemon.image} width="250" height="250" />
                <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
                <ul className="flex gap-4 my-4">
                    <AbilitiesChip abilities={pokemon.abilities} />
                </ul>
                {enabled && yodaData.length ? yodaData.map(effect => <p key={effect.contents.translated}>{effect.contents.translated}</p>) : formatEffectData.map(effect => <p key={effect}>{effect}</p>)}
            </article>
        </div>

    )
}