import { render, screen, fireEvent, act } from '@testing-library/react';
import { forwardRef, useContext } from 'react';
import Link from './link/link';

import Navigation from './navigation';
import { NavigationContext } from './reducer/context/navigation-context';
import Route from './route/route';

describe(`navigation component test`, () => {
  it(`should render component with default route`, () => {
    render(
      <Navigation>
        <Route path="/" component={<>TEST</>} />
      </Navigation>,
    );

    expect(screen.queryByText('TEST')).toBeTruthy();
  });

  it(`should render component and select route selected by window.location`, () => {
    window.location.pathname = '/test2';

    render(
      <Navigation>
        <Route path="/" component={<>default</>} />
        <Route path="/test2" component={<>test 2</>} />
      </Navigation>,
    );

    expect(screen.queryByText('test 2')).toBeTruthy();
  });

  it(`should render component and select route selected by window.location with argument`, () => {
    window.location.pathname = '/test2/test-argument';

    let argument = '';

    const TestPage = forwardRef(() => {
      argument = useContext(NavigationContext).state.argument;

      return <>test 2</>;
    });

    render(
      <Navigation>
        <Route path="/" component={<>default</>} />
        <Route path="/test2" component={<TestPage />} />
      </Navigation>,
    );

    expect(screen.queryByText('test 2')).toBeTruthy();
    expect(argument).toEqual('test-argument');
  });

  it(`should throw error if second route with the same name was added`, () => {
    expect(() => {
      render(
        <Navigation>
          <Route path="/" component={<>TEST</>} />

          <Route path="/" component={<>TEST</>} />
        </Navigation>,
      );
    }).toThrowError(`Another route with that path has been already added!`);
  });

  it(`should throw error if route with incorrect for was added`, () => {
    expect(() => {
      render(
        <Navigation>
          <Route path="" component={<>TEST</>} />
        </Navigation>,
      );
    }).toThrowError(`Incorrect path format!`);

    expect(() => {
      render(
        <Navigation>
          <Route path="" component={<>TEST</>} />
        </Navigation>,
      );
    }).toThrowError(`Incorrect path format!`);

    expect(() => {
      render(
        <Navigation>
          <Route path="/asd/asd" component={<>TEST</>} />
        </Navigation>,
      );
    }).toThrowError(`Incorrect path format!`);

    expect(() => {
      render(
        <Navigation>
          <Route path="asd/asd" component={<>TEST</>} />
        </Navigation>,
      );
    }).toThrowError(`Incorrect path format!`);
  });

  it(`should change component after link click`, async () => {
    render(
      <Navigation>
        <Route path="/" component={<>default</>} />

        <Route path="/test" component={<>test</>} />

        <Link to="/test">link to test</Link>
      </Navigation>,
    );

    fireEvent.click(await screen.findByText('link to test'));
    expect(screen.queryByText('test')).toBeTruthy();
  });

  it(`should change component to default 404 component after link click if component with that link path doesn't exist`, async () => {
    render(
      <Navigation>
        <Route path="/" component={<>default</>} />

        <Route path="/test" component={<>test</>} />

        <Link to="/notExist">link to notExist</Link>
      </Navigation>,
    );

    fireEvent.click(await screen.findByText('link to notExist'));
    expect(screen.queryByText(`Page doesn't exist`)).toBeTruthy();
  });

  it(`should change component to specify 404 component after link click if component with that link path doesn't exist`, async () => {
    render(
      <Navigation>
        <Route path="/" component={<>default</>} />

        <Route path="/404" component={<>Error 404 page doesn&apost exist</>} />

        <Route path="/test" component={<>test</>} />

        <Link to="/notExist">link to notExist</Link>
      </Navigation>,
    );

    fireEvent.click(await screen.findByText('link to notExist'));
    expect(screen.queryByText(`Error 404 page doesn&apost exist`)).toBeTruthy();
  });

  it(`should play exit animation after change route`, async () => {
    const testPromise = new Promise<void>((resolve) => {
      render(
        <Navigation>
          <Route
            path="/"
            component={<>default</>}
            exitAnimation={{
              animation: () => {
                expect(true).toBe(true);
              },
              time: 0.001,
            }}
          />

          <Route
            path="/test"
            component={<>test</>}
            enterAnimation={{
              animation: () => {},
              cleanup: () => resolve(),
              time: 0.001,
            }}
          />

          <Link to="/test">link to test</Link>
        </Navigation>,
      );
    });

    fireEvent.click(await screen.findByText('link to test'));
    await act(async () => testPromise);
  });

  it(`should play enter animation after change route`, async () => {
    const testPromise = new Promise<void>((resolve) => {
      render(
        <Navigation>
          <Route
            path="/"
            component={<>default</>}
            exitAnimation={{
              animation: () => {},
              time: 0.001,
            }}
          />

          <Route
            path="/test"
            component={<>test</>}
            enterAnimation={{
              animation: () => {
                expect(true).toBe(true);
              },
              cleanup: () => resolve(),
              time: 0.001,
            }}
          />

          <Link to="/test">link to test</Link>
        </Navigation>,
      );
    });

    fireEvent.click(await screen.findByText('link to test'));
    await act(async () => testPromise);
  });

  it(`should play specific to route exit animation after change route`, async () => {
    window.location.pathname = '/test1';

    const testPromise = new Promise<void>((resolve) => {
      render(
        <Navigation>
          <Route path="/" component={<>default</>} />

          <Route
            path="/test1"
            component={<>test 1</>}
            exitAnimation={{
              default: {
                animation: () => {
                  expect(false).toBe(true);
                },
                time: 0.001,
              },
              '/test2': {
                animation: () => {
                  expect(true).toBe(true);
                },
                time: 0.001,
              },
            }}
          />

          <Route
            path="/test2"
            component={<>test 2</>}
            enterAnimation={{
              default: {
                animation: () => {},
                cleanup: () => resolve(),
                time: 0.001,
              },
              '/test1': {
                animation: () => {},
                cleanup: () => resolve(),
                time: 0.001,
              },
            }}
          />

          <Link to="/test1">link to test 1</Link>
          <Link to="/test2">link to test 2</Link>
        </Navigation>,
      );
    });

    fireEvent.click(await screen.findByText('link to test 2'));
    await act(async () => testPromise);
  });

  it(`should play specific to route enter animation after change route`, async () => {
    window.location.pathname = '/test1';

    const testPromise = new Promise<void>((resolve) => {
      render(
        <Navigation>
          <Route path="/" component={<>default</>} />

          <Route
            path="/test1"
            component={<>test 1</>}
            exitAnimation={{
              default: {
                animation: () => {},
                time: 0.001,
              },
              '/test2': {
                animation: () => {},
                time: 0.001,
              },
            }}
          />

          <Route
            path="/test2"
            component={<>test 2</>}
            enterAnimation={{
              default: {
                animation: () => {
                  expect(false).toBe(true);
                },
                cleanup: () => resolve(),
                time: 0.001,
              },
              '/test1': {
                animation: () => {
                  expect(true).toBe(true);
                },
                cleanup: () => resolve(),
                time: 0.001,
              },
            }}
          />

          <Link to="/test1">link to test 1</Link>
          <Link to="/test2">link to test 2</Link>
        </Navigation>,
      );
    });

    fireEvent.click(await screen.findByText('link to test 2'));
    await act(async () => testPromise);
  });
});
