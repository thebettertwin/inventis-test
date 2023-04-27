import { fireEvent, screen, render } from '@testing-library/react';
import Toggle from "./Toggle";



describe("<Toggle />", () => {
  it('renders to the page', () => {
    const { queryAllByText } = render(
      <Toggle enabled={true} onChange={jest.fn()} />,
    );

    expect(queryAllByText(/Enable Yoda language translations/i)).toBeTruthy();
  });

  it('fires the onChange', () => {
    const handleChange = jest.fn()
    render(
      <Toggle enabled={true} onChange={handleChange} />,
    );

    fireEvent(screen.getByRole("switch"), new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }))
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});