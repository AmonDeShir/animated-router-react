import { useContext } from 'react';

import { NavigationContext } from '../../reducer/context/navigation-context';

const useOpenPage = () => {
  const { dispatch } = useContext(NavigationContext);

  const prepareData = (data: string | object) =>
    encodeURI(typeof data === 'string' ? data : JSON.stringify(data));

  return (
    page: string,
    options: { argument?: string | object; updateHistory?: boolean } = {},
  ) => {
    const { argument, updateHistory = false } = options;
    const path = argument ? `${page}/${prepareData(argument)}` : page;

    if (page.length === 0) {
      throw Error(`Page can't be an empty string!`);
    }

    dispatch({
      type: 'SELECT',
      payload: { updateHistory, path },
    });
  };
};

export default useOpenPage;
