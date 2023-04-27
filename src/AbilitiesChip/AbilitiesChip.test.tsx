import { render } from '@testing-library/react';
import AbilitiesChip from "./AbilitiesChip";



describe("<AbilitiesChip />", () => {
    it('renders to the page', () => {
        const { queryAllByText } = render(
            <AbilitiesChip abilities={[{ ability: { name: 'fire power', url: './' } }]} />,
        );

        expect(queryAllByText(/fire power/i)).toBeTruthy();
    });
});