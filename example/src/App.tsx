import Navigation, { Route } from 'animated-router-react';

function App() {
  return (
    <Navigation>
      <Route
        path="/"
        component={<>Page 0</>}
      />

      <Route
        path="/1"
        component={<>Page 1</>}
      />

      <Route
        path="/2"
        component={<>Page 2</>}
      />

      <Route
        path="/3"
        component={<>Page 3</>}
      />

      Data XDDD
    </Navigation>
  );
}

export default App;
