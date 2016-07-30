export const searchClose = () => {
  return {
    type: 'SEARCH_CLOSE'
  };
};

export const searchOpen = () => {
  return {
    type: 'SEARCH_OPEN'
  };
};

export const searchText = (string) => {
  return {
    type: 'SEARCH_STRING',
    string
  };
};