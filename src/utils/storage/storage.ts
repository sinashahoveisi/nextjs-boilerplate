export const saveToStorage = (name: string, data: any) => {
  localStorage.setItem(name, encodeURIComponent(JSON.stringify(data)));
};

export const getFromStorage = (name: string): any => {
  return localStorage.getItem(name) !== null && JSON.parse(decodeURIComponent(localStorage.getItem(name) || '') || '');
};

export const deleteFromStorage = (name: string) => {
  localStorage.removeItem(name);
};
