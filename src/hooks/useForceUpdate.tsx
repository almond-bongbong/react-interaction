import { useState } from 'react';

const useForceUpdate = () => {
  const [, setState] = useState(0);

  return () => {
    setState(v => v + 1);
  };
};

export default useForceUpdate;
