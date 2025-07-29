
export default function EditModal({ selectedProduct, setSelectedProduct, onUpdate }) {
	
	const handleChange = e =>{
		setSelectedProduct({
			...selectedProduct,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = e =>{
		e.preventDefault();
		onUpdate()
	}

  return (
    <dialog id="edit_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center my-2">Edit Product</h3>
        {selectedProduct && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Title"
			  name="title"
              value={selectedProduct.title}
              onChange={handleChange}
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Description"
			  name="description"
              value={selectedProduct.description}
              onChange={handleChange}
            />
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Price"
			  name="price"
              value={selectedProduct.price}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Category"
			  name="category"
              value={selectedProduct.category}
              onChange={handleChange}
            />

            <div className="modal-action">
              <button type="submit" className="btn btn-success text-white">
                Update
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('edit_modal').close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
