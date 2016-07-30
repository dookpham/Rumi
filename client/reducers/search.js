const search = (state = {closed: true, string: ''}, action) => {

  switch (action.type) {

  case 'SEARCH_CLOSE':
    return {
      closed: true,
      string: ''
    };
  case 'SEARCH_OPEN':
    return {
      closed: false,
      string: ''
    };
  case 'SEARCH_STRING':
    return {
      closed: false,
      string: action.string
    };
  default:
    return state;
  }
};

export default search;