import { useContext } from 'react';

import { NavigationContext } from '../reducer/context/navigation-context';

const Error404Route = () => {
  const { state } = useContext(NavigationContext);

  if (state.selected === null) {
    return <>{state.routes.get('/404')?.component || "Page doesn't exist"}</>;
  }

  return <></>;
};

export default Error404Route;
