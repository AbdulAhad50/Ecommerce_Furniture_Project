import { httpAxios } from "@/helper/axios";

export async function Signup(user:any) {
  let res = await httpAxios.post('/api/user', user);
  return res.data
}


export async function Login(loginData:any) {
  let res = await httpAxios.post('/api/login', loginData);
  return res.data
}

export async function Logout() {
  let res = await httpAxios.post('/api/logout');
  return res.data
}


export async function currentUser() {
  let res = await httpAxios.get('/api/current');
  return res.data
}