import axios from "axios"

export const getAllApiData = () => {
    return axios.get("https://dummyjson.com/products")
}

export const loginUserAPI = (values) => {
  return axios.post('https://dummyjson.com/auth/login',values,{
      headers: { 'Content-Type': 'application/json' }
  })
}
