import { screen, render } from '@testing-library/react';
import DisplayPokemon from "./DisplayPokemon";

const pokemonData = [
    {
        name: 'jigglychu', id: 3, image: '/pokemon.jpg', abilities: [{
            abilities: {
                name: 'fire',
                url: '/fire',
                effect: 'flame',
                language: {
                    name: 'en',
                }
            },
            ability: { url: '/ability/1', name: 'fire flame' }
        }]
    }
]

describe("<DisplayPokemon />", () => {
    it('renders to the page', () => {
        const { queryAllByText } = render(
            <DisplayPokemon pokemonData={pokemonData} />,
        );

        expect(queryAllByText(/jigglychu/i)).toBeTruthy();
        expect(screen.getAllByRole("img")).toBeDefined();
    });
});