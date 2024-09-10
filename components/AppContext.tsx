import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const balanceState = {
  myProducts: [],
  balanceState: 500,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        myProducts: [...state.myProducts, action.payload],
        balanceState: state.balanceState - action.payload.price,
      };
    case 'SELL_PRODUCT':
      const sellProduct = state.myProducts.filter(
        (product) => product.id !== action.payload.id,
      );
      return {
        ...state,
        myProducts: sellProduct,
        balanceState: state.balanceState + action.payload.price,
      };
    case 'ADD_BALANCE':
      return {
        ...state,
        balanceState: state.balanceState + action.payload,
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, balanceState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContext.Provider');
  }
  return context;
};

export { AppProvider, useAppContext };
