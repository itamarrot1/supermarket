import axios from "axios";

const SERVER = 'http://127.0.0.1:8000/'

export function FetchProducts() {
    return axios(SERVER + 'products/')
  }
  