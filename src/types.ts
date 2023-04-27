// Future improvement: Found pokenode-ts after writing these all the response apis are fully typed rather than just what I needed here
export type Pokemon = {
  name: string;
  image: string;
  id: number;
  abilities: Abilities[];
  effect_entries: Effect[];
  results: { url: string }[];
  ability: { url: string; name: string };
};

export type SimplePokemon = Omit<
  Pokemon,
  "ability" | "results" | "effect_entries"
>;

export type YodaTranslation = {
  contents: {
    translated: string;
  };
  error?: {};
};

type Effect = {
  effect: string;
  language: { name: string };
};

type Abilities = {
  abilities: {
    name: string;
    url: string;
    effect: string;
    language: {
      name: string;
    };
  };
  ability: { url: string; name: string };
};
