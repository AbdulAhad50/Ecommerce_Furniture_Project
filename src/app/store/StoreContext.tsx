"use client";
import { createContext, useReducer, ReactNode } from "react";

// Define the types for the actions and state
type Product = {
  name: string;
  price: number;
  image: string;
  id: string;
  quantity: number;
};

interface ORDER {
    totalPrice: number;
    totalQuantity:number[];
    totalName: string[];
    singleProductPrice: number[];
}

type FavouriteProduct = {
  name: string;
  price: number;
  image: string;
  id: string;
};

type Action =
  | { type: "Add_To_Cart"; payload: { newItem: Product } }
  | { type: "DELETE_To_Cart"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "DECREASE_QUANTITY"; payload: { id: string; quantity: number } };

// Define reducer for cart products
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

// Define reducer for favorite products
const reducerFavourite = (
  currentFavouriteValue: FavouriteProduct[],
  action: { type: "Favourite_ITEM"; payload: { newFavouriteItem: FavouriteProduct } } | { type: "DELETE_FAVOURITE_ITEM"; payload: { id: string } }
): FavouriteProduct[] => {
  let newItem = [...currentFavouriteValue];

  if (action.type === "Favourite_ITEM") {
    newItem = [...currentFavouriteValue, action.payload.newFavouriteItem];
  } else if (action.type === "DELETE_FAVOURITE_ITEM") {
    newItem = currentFavouriteValue.filter((product) => product.id !== action.payload.id);
  }

  return newItem;
};

// Define reducer for placed orders
const orderPlaced = (
  currentPlcaedOrder: ORDER[], 
  action: { type: "ORDER_PLACED"; payload: { placedItem: ORDER } }
): ORDER[] => {
  let newItem:ORDER[] = [...currentPlcaedOrder];

  if (action.type === "ORDER_PLACED") {
    newItem = [action.payload.placedItem];
  }

  return newItem;
};

function SearchNow(currentValue:any , action:any){

  let newValue = currentValue

    if(action.type == 'SEARCHING'){
      // console.log("././.",action.payload.text)
      newValue = action.payload.text
    }

    return newValue
    
}


function Filter(currentValue:any, action:any){
  let newValue = currentValue;

  if(action.type == 'FILTER_PRICE'){
      console.log(Number(action.payload.price))
      newValue = Number(action.payload.price)
  }

  return newValue
}

// Compare Product
function Compare(currentValue:any, action:any){
    let newValue = currentValue ;
    if(action.type == 'COMPARE_PRODUCT'){
      newValue = [action.payload.id];
    }

    return newValue
}



// Create context with proper typing
interface StoreContextType {
  data: Product[];
  addProduct: (name: string, price: number, image:string , id: string, quantity: number) => void;
  favouriteProduct: (name: string, price: number, image: string, id: string) => void;
  deleteProduct: (id: string) => void;
  upDateQuantity: (id: string) => void;
  DecreaseQuanity: (id: string) => void;
  favouriteProductItem: FavouriteProduct[];
  deleteFavouriteProduct: (id: string) => void;
  orderplaced: (totalPrice: number, totalQuantity: number[], totalName: string[], singleProductPrice: number[]) => void;
  placedOrder: ORDER[];
  Search : (text:string) => void;
  search:string,
  filter:number,
  FilterData : (price:string)=>void;
  CompareProduct:(id:string)=> void,
  compare:string[]
}

export const StoreData = createContext<StoreContextType>({
  data: [],
  addProduct: () => {},
  favouriteProduct: () => {},
  deleteProduct: () => {},
  upDateQuantity: () => {},
  DecreaseQuanity: () => {},
  favouriteProductItem: [],
  deleteFavouriteProduct: () => {},
  orderplaced: () => {},
  placedOrder: [],
  Search : ()=>{},
  search:"",
  filter:0,
  FilterData : ()=>{},
  CompareProduct: ()=>{},
  compare:[]
});

interface StoreDataProviderProps {
  children: ReactNode;
}

const StoreDataProvider = ({ children }: StoreDataProviderProps) => {
  const [data, dispatchData] = useReducer(reducer, []);
  const [favouriteProductItem, dispatchFavouriteProduct] = useReducer(reducerFavourite, []);
  const [placedOrder, dispatchPlcaedOrder] = useReducer(orderPlaced, []);

  const [search, dispatchSearch] = useReducer(SearchNow,"");
  const [filter, dispatchFilter] = useReducer(Filter,0);
  const [compare, dispatchCompare] = useReducer(Compare, [])
  

  function addProduct(
    name: string,
    price: number,
    image: string,
    id: string,
    quantity = 0
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
    image: string,
    id: string
  ) {
    const newFavouriteItem: FavouriteProduct = { name, price, image, id };
    dispatchFavouriteProduct({ type: "Favourite_ITEM", payload: { newFavouriteItem } });
  }

  function deleteFavouriteProduct(id: string) {
    dispatchFavouriteProduct({ type: "DELETE_FAVOURITE_ITEM", payload: { id } });
  }

  function DecreaseQuanity(id: string) {
    dispatchData({ type: "DECREASE_QUANTITY", payload: { id, quantity: -1 } });
  }

  function orderplaced(
    totalPrice: number,
    totalQuantity:number[],
    totalName: string[],
    singleProductPrice: number[] 
  ) {

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


  function Search(text:string){
    console.log("Searching",text)
      let Search_Action = {
        type : "SEARCHING",
        payload : {text}
      }

      dispatchSearch(Search_Action)
  }


  function FilterData(price:string){
      console.log("******",price);

      let Filter_Value = {
        type:"FILTER_PRICE",
        payload: {price}
      }

      dispatchFilter(Filter_Value)
  }


  function CompareProduct(id:string){
      console.log("Id Mil Gaye", id)

      let New_Action = {
        type : 'COMPARE_PRODUCT',
        payload: {id}
      }

      dispatchCompare(New_Action)
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
        placedOrder,
        Search,
        search,
        filter,
        FilterData,
        CompareProduct,
        compare
      }}
    >
      {children}
    </StoreData.Provider>
  );
};

export default StoreDataProvider;
