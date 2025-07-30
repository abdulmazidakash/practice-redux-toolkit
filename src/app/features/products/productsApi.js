import axios from "axios"

export const getProducts = async()=>{
	const res = await axios.get('http://localhost:3005/products');
	return res.data;
}