"use client";
import { createContext, useReducer, ReactNode } from "react";

// Define the types for the actions and state
type Product = {
  name: string;
  price: number;
  image: { asset: { _ref: string; _type: string }; _type: string };
  id: string;
  quantity: number;
};


type FavouriteProduct = {
  name: string;
  price: number;
  image: { asset: { _ref: string; _type: string }; _type: string };
  id: string;
};

type Action =
  | { type: "Add_To_Cart"; payload: { newItem: Product } }
  | { type: "DELETE_To_Cart"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "DECREASE_QUANTITY"; payload: { id: string; quantity: number } };

type FavouriteAction = { type: "Favourite_ITEM"; payload: { newFavouriteItem: FavouriteProduct } };


const reducer = (currentValue: Product[], action: Action): Product[] => {
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
// FavouriteProduct[]
// FavouriteAction
const reducerFavourite = (
  currentFavouriteValue: any,
  action:any 
): FavouriteProduct[] => {
  let newItem = [...currentFavouriteValue];

  if (action.type === "Favourite_ITEM") {
    newItem = [...currentFavouriteValue, action.payload.newFavouriteItem];
  }

  else if(action.type ==='DELETE_FAVOURITE_ITEM'){
    newItem = currentFavouriteValue.filter((product:any)=> product.id != action.payload.id)
  }

  return newItem;
};

const orderPlaced = (currentPlcaedOrder:any, action: any)=>{

    let newItem;

    if(action.type === 'ORDER_PLACED'){
      newItem = [
        action.payload.placedItem
      ]
    }

    console.log("new",newItem)
    return newItem
}


interface PLACEDORDER{
  totalPrice:number;
  totalQuanity:number[];
  totalName:string[];
  singleProductPrice:number[]
}

// Create context with proper typing
interface StoreContextType {
  data: Product[];
  addProduct: (name: string, price: number, image: { asset: { _ref: string; _type: string }; _type: string }, id: string, quantity:number) => void;
  favouriteProduct: (name: string, price: number, image: { asset: { _ref: string; _type: string }; _type: string }, id: string) => void;
  deleteProduct: (id: string) => void;
  upDateQuantity: (id: string) => void;
  DecreaseQuanity: (id: string) => void;
  favouriteProductItem: FavouriteProduct[];
  deleteFavouriteProduct : (id:string)=> void;
  orderplaced : (totalPrice:number, totalQuantity:any[] | number[] | undefined[] | null, totalName:[] | any[],singleProductPrice:[] | any[])=>void,
  placedOrder : any[] | undefined
}

export const StoreData = createContext<StoreContextType>({
  data: [],
  addProduct: () => {},
  favouriteProduct: () => {},
  deleteProduct: () => {},
  upDateQuantity: () => {},
  DecreaseQuanity: () => {},
  favouriteProductItem: [],
  deleteFavouriteProduct : ()=>{},
  orderplaced : () =>{} ,
  placedOrder : []
});

interface StoreDataProviderProps {
  children: ReactNode;
}

const StoreDataProvider = ({ children }: StoreDataProviderProps) => {
  const [data, dispatchData] = useReducer(reducer, []);
  const [favouriteProductItem, dispatchFavouriteProduct] = useReducer(reducerFavourite, []);

  const [placedOrder, dispatchPlcaedOrder] = useReducer(orderPlaced, [])

  function addProduct(
    name: string,
    price: number,
    image: { asset: { _ref: string; _type: string }; _type: string },
    id: string,
    quantity= 0
  ) {
    const newItem: Product = { name, price, image, quantity, id };

    dispatchData({ type: "Add_To_Cart", payload: { newItem } });
  }

  function deleteProduct(id: string) {
    dispatchData({ type: "DELETE_To_Cart", payload: { id } });
  }

  function upDateQuantity(id: string) {
    dispatchData({ type: "UPDATE_QUANTITY", payload: { id, quantity: 1 } });
  }

  function favouriteProduct(
    name: string,
    price: number,
    image: { asset: { _ref: string; _type: string }; _type: string },
    id: string
  ) {

    const newFavouriteItem: FavouriteProduct = { name, price, image, id };

    dispatchFavouriteProduct({ type: "Favourite_ITEM", payload: { newFavouriteItem } });
  }


  function deleteFavouriteProduct(id:string){
      let New_DeleteItem = {
        type: 'DELETE_FAVOURITE_ITEM',
        payload : {id}
      }

      dispatchFavouriteProduct(New_DeleteItem)

  }


  function DecreaseQuanity(id: string) {
    dispatchData({ type: "DECREASE_QUANTITY", payload: { id, quantity: -1 } });
  }


  function orderplaced(totalPrice:number, totalQuantity:any[] | number[] | undefined[] | null, totalName:[] | any[],singleProductPrice:[] | any[]){

      let placedItem = {
        totalPrice,
        totalQuantity,
        totalName,
        singleProductPrice
      }

      console.log(placedItem)

      let newAction = {
          type : 'ORDER_PLACED',
          payload : {placedItem}
      }

      dispatchPlcaedOrder(newAction)
  }

  return (
    <StoreData.Provider value={{ data ,deleteProduct, addProduct, upDateQuantity, DecreaseQuanity, favouriteProductItem, favouriteProduct , deleteFavouriteProduct, orderplaced,placedOrder}}>
      {children}
    </StoreData.Provider>
  );
};

export default StoreDataProvider;




let DEFAULT = [
  {name:"Bat", price:200, id:1},
  {name:"Ball", price:400, id:2},
  {name:"Wicket", price:100, id:3},
]