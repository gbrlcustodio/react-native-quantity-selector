const initialState = {
  quantity: '1'
}

const quantitySelector = (state = initialState, action) => {
  switch (action.type) {
    case 'QUANTITYSELECTOR_INCREASE':
      return { ...state, quantity: state.quantity + 1 }
    case 'QUANTITYSELECTOR_DECREASE':
      return { ...state, quantity: state.quantity - 1 }
    case 'QUANTITYSELECTOR_UPDATE':
      return { ...state, quantity: action.quantity }
    default:
      return state;
  }
}

export default quantitySelector
