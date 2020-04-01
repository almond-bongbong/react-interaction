import { hasWindow } from './browser';

export const addRootElement = (id: string) => {
  if (!hasWindow()) return;

  const element = document.createElement('div');
  element.setAttribute('id', id);
  document.body.appendChild(element);
};
