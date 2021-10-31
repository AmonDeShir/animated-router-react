import { RefObject, useContext, useEffect, useState } from 'react';
import { NavigationContext } from '../../reducer/context/navigation-context';

const useApplyDefaultState = (ref: RefObject<HTMLElement>) => {
  const { initPath, selected } = useContext(NavigationContext).state;
  const [wasUsed, setWasUsed] = useState(false);

  useEffect(() => {
    if (initPath === selected?.path && !wasUsed && selected.init) {
      setWasUsed(true);
      selected.init(ref);
    }
  }, [initPath, ref, selected, wasUsed]);
};

export default useApplyDefaultState;
