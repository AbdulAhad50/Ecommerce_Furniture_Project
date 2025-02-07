import { httpAxios } from "@/helper/axios";

export const adminDelete = async (productId:any)=>{
  try {
    let res = await httpAxios.delete('/api/product', productId);
    return res.data
  } catch (error) {
    console.log(error)
  }
}