"use client";
import { createContext, useReducer } from "react";

// Define the types for the actions and state
const reducer = (currentValue, action) => {
  let newValue = [...currentValue];

  if (action.type === "Add_To_Cart") {
    newValue = [...currentValue, action.payload.newItem];
  } else if (action.type === "DELETE_To_Cart") {
    newValue = currentValue.filter((item) => item.id !== action.payload.id);
  } else if (action.type === "UPDATE_QUANTITY") {
    newValue = currentValue.map((product) =>
      product.id === action.payload.id
        ? { ...product, quantity: product.quantity + action.payload.quantity }
        : product
    );
  } else if (action.type === "DECREASE_QUANTITY") {
    newValue = currentValue.map((product) =>
      product.id === action.payload.id
        ? { ...product, quantity: Math.max(product.quantity - 1, 0) }
        : product
    );
  }

  return newValue;
};

const reducerFavourite = (
  currentFavouriteValue,
  action
) => {
  let newItem = [...currentFavouriteValue];

  if (action.type === "Favourite_ITEM") {
    newItem = [...currentFavouriteValue, action.payload.newFavouriteItem];
  } else if (action.type === "DELETE_FAVOURITE_ITEM") {
    newItem = currentFavouriteValue.filter((product) => product.id !== action.payload.id);
  }

  return newItem;
};

const orderPlaced = (currentPlcaedOrder, action) => {
  let newItem = [...currentPlcaedOrder];

  if (action.type === "ORDER_PLACED") {
    newItem = [action.payload.placedItem];
  }

  return newItem;
};

// Create context with proper typing
export const StoreData = createContext({
  data: [],
  addProduct: () => {},
  favouriteProduct: () => {},
  deleteProduct: () => {},
  upDateQuantity: () => {},
  DecreaseQuanity: () => {},
  favouriteProductItem: [],
  deleteFavouriteProduct: () => {},
  orderplaced: () => {},
  placedOrder: []
});

const StoreDataProvider = ({ children }) => {
  const [data, dispatchData] = useReducer(reducer, []);
  const [favouriteProductItem, dispatchFavouriteProduct] = useReducer(reducerFavourite, []);
  const [placedOrder, dispatchPlcaedOrder] = useReducer(orderPlaced, []);

  function addProduct(name, price, image, id, quantity = 0) {
    const newItem = { name, price, image, quantity, id };
    dispatchData({ type: "Add_To_Cart", payload: { newItem } });
  }

  function deleteProduct(id) {
    dispatchData({ type: "DELETE_To_Cart", payload: { id } });
  }

  function upDateQuantity(id) {
    dispatchData({ type: "UPDATE_QUANTITY", payload: { id, quantity: 1 } });
  }

  function favouriteProduct(name, price, image, id) {
    const newFavouriteItem = { name, price, image, id };
    dispatchFavouriteProduct({ type: "Favourite_ITEM", payload: { newFavouriteItem } });
  }

  function deleteFavouriteProduct(id) {
    dispatchFavouriteProduct({ type: "DELETE_FAVOURITE_ITEM", payload: { id } });
  }

  function DecreaseQuanity(id) {
    dispatchData({ type: "DECREASE_QUANTITY", payload: { id, quantity: -1 } });
  }

  function orderplaced(totalPrice, totalQuantity, totalName, singleProductPrice) {
    const placedItem = {
      totalPrice,
      totalQuantity,
      totalName,
      singleProductPrice
    };

    dispatchPlcaedOrder({
      type: "ORDER_PLACED",
      payload: { placedItem }
    });
  }

  return (
    <StoreData.Provider
      value={{
        data,
        deleteProduct,
        addProduct,
        upDateQuantity,
        DecreaseQuanity,
        favouriteProductItem,
        favouriteProduct,
        deleteFavouriteProduct,
        orderplaced,
        placedOrder
      }}
    >
      {children}
    </StoreData.Provider>
  );
};

export default StoreDataProvider;
