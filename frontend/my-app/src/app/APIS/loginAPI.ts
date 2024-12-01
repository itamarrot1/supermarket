import axios from "axios"

const SERVER = 'http://127.0.0.1:8000/'


export const login = (username: string,password: string)=>{
   return axios.post(`${SERVER}login/`,{username,password})
}