
export default function ProductCard({product, onEdit, handleDelete}) {
	


  return (
	<div className="shadow hover:translate-y-0.5 border border-gray-300 p-4 bg-red-100 font-semibold rounded-lg flex flex-col justify-between">
		<h2 className="text-2xl font-bold my-2">Title: {product?.title}</h2>
		<p>Description: {product?.description}</p>
		<h3>Price: {product.price}</h3>
		<h3>Category: {product.category}</h3>
		
		{/* button alignments  */}
		<div className="flex gap-2 my-2">
			<button onClick={onEdit} className="btn btn-sm btn-success my-2 font-semibold text-white mr-4">Edit</button>
			<button onClick={()=>handleDelete(product.id)} className="btn btn-sm btn-error my-2 font-semibold text-white">Delete</button>
		</div>
	</div>
  )
}
