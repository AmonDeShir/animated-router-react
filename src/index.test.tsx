import { render } from '@testing-library/react';
import { Example } from '.';


describe('test', () => {
  it(`should fail`, () => {
    expect(true).toBeFalsy();
  })

  it(`should render`, () => {
    render(<Example/>)
  })

})