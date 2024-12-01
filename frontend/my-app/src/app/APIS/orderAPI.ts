import axios from "axios"

const SERVER = 'http://127.0.0.1:8000/'
const token = localStorage.getItem('token')
export const placeOrder = (orderData: any)=> {
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
    };
    console.log(orderData);
    
    return axios.post(SERVER + 'order/', orderData,{headers})

}