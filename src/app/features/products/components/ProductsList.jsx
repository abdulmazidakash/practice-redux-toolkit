import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, fetchProducts, updateProduct } from '../productsSlice';
import ProductCard from './ProductCard';
import EditModal from './EditModal';
import Swal from 'sweetalert2';

export default function ProductsList() {
	const {products, isLoading, error } = useSelector((state)=>state.productsR)
	const dispatch = useDispatch();
	const [selectedProduct, setSelectedProduct] = useState(null);

	useEffect(()=>{
		dispatch(fetchProducts())
	},[dispatch]);
	console.log(products);

	const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id)).then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Product has been deleted successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };

	const handleUpdate = () =>{
		dispatch(updateProduct({id: selectedProduct.id, product: selectedProduct}))
		.then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Product updated successfully',
          timer: 1500,
          showConfirmButton: false,
        });
        document.getElementById('edit_modal').close();
      });
	}
  return (
	<div className='w-11/12 mx-auto my-8'>
		{isLoading && <h2>Loading...</h2>}
		{error && <p>Error: {error.message}</p>}
		{!isLoading && !error && products && products.length > 0 && (
			<section className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
				{products.map((product)=>
			{	return	<ProductCard 
						handleDelete={handleDelete}
						onEdit={() => {
							setSelectedProduct(product);
							document.getElementById('edit_modal').showModal();
						}}
						key={product.id} 
						product={product} />}
				)}
			</section>
		)}

		{/* edit modal  */}
		<EditModal 
		selectedProduct={selectedProduct}
		setSelectedProduct={setSelectedProduct}
		onUpdate={handleUpdate}
		 />
	</div>
  )
}
