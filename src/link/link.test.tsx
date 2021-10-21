import { fireEvent, render, screen } from '@testing-library/react';

import { NavigationContext } from '../reducer/context/navigation-context';
import Link from './link';

describe('Link', () => {
  it(`should render children`, async () => {
    render(<Link to="/">Text</Link>);
    expect(await screen.findByText('Text')).toBeTruthy();
  });

  it(`should dispatch select action after click`, async () => {
    const dispatch = jest.fn();

    render(
      <NavigationContext.Provider value={{ dispatch, state: {} as any }}>
        <Link to="/testPage">Text</Link>
      </NavigationContext.Provider>,
    );

    fireEvent.click(screen.getByText('Text'));
    expect(dispatch).toBeCalledWith({ type: 'SELECT', payload: '/testPage' });
  });
});
