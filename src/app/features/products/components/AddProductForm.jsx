import { nanoid } from "nanoid"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { createProduct } from "../productsSlice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


export default function AddProductForm() {
	const [product, setProduct] = useState({
		id: '',
		title: '',
		description: '',
		price: '',
		category: '',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = e =>{
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async e =>{
		e.preventDefault();
		// console.log('submit product:--->',{...product, id:nanoid()});
		 try {
		 	await	dispatch(createProduct({...product, id:nanoid()}))
			 // Show success alert
			Swal.fire({
				icon: "success",
				title: "Product Added!",
				text: "Your product has been added successfully.",
				timer: 1500,
				showConfirmButton: false,
			});
			navigate('/')
		 } catch (error) {
			console.log('something went wrong', error);
			// Show error alert
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Failed to add product. Please try again.",
			});
		 }

	}
  return (
	<div className="flex justify-center items-center min-h-screen">
		<form action="" onSubmit={handleSubmit}>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend className="fieldset-legend">Add Product</legend>

				{/* title  */}
				<label className="label">Title</label>
				<input type="text" className="input" placeholder="Title" value={product.title} onChange={handleChange} name="title" />
				{/* description  */}
				<label className="label">Description</label>
				<textarea rows={5} cols={5} type="text" className="input" placeholder="Description" name="description" value={product.description} onChange={handleChange} />
				{/* price  */}
				<label className="label">Price</label>
				<input type="number" className="input" placeholder="Price" name="price" value={product.price} onChange={handleChange} />
				{/* category  */}
				<label className="label">Category</label>
				<input type="text" className="input" placeholder="Category" name="category" value={product.category} onChange={handleChange} />

				<button className="btn btn-neutral mt-4">Add Product</button>
			</fieldset>
		</form>
	</div>
  )
}
