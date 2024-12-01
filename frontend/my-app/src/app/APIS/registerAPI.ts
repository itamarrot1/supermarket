import axios from "axios"

const SERVER = 'http://127.0.0.1:8000/'


export const register = (username: string,password: string,address: string,phone: string)=>{
   console.log(username,password,address,phone);
   
   return axios.post(`${SERVER}register`,{username,password,address,phone})
}