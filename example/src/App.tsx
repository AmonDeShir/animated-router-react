import Navigation, { Route } from 'animated-router-react';
import { useRef } from 'react';
import { enterDown, enterRight, enterUp, exitDown, exitRight, exitUp } from './animations';
import Header from './components/header/header';
import LogIn from './pages/log-in';
import Main from './pages/main';
import Register from './pages/register';
import ResetPassword from './pages/reset-password';

function App() {
  const header = useRef<HTMLDivElement>(null);

  return (
    <Navigation>
      <Header ref={header} />

      <Route
        path="/"
        component={<Main />}
        enterAnimation={{
          "/log-in": enterUp(header),
          '/register': enterUp(header),
        }}
        exitAnimation={{
          "/log-in": exitDown(header),
          "/register": exitDown(header),
        }}
      />

      <Route
        path="/log-in"
        component={<LogIn />}
        enterAnimation={{
          "/": enterDown,
          'default': enterRight,
        }}
        exitAnimation={{
          "/": exitUp,
          'default': exitRight,
        }}
      />

      <Route
        path="/register"
        component={<Register />}
        enterAnimation={{
          "/": enterDown,
          'default': enterRight,
        }}
        exitAnimation={{
          "/": exitUp,
          'default': exitRight,
        }}
      />

      <Route
        path="/reset-password"
        component={<ResetPassword />}
        enterAnimation={enterRight}
        exitAnimation={exitRight}
      />      
    </Navigation>
  );
}

export default App;
