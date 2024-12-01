import { useState } from "react";

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPicture, setProductPicture] = useState<File>();
  const [status, setStatus] = useState(""); // e.g., 'loading', 'success', 'failed'

  const handleAddProduct =  () => {
    if (!productName || !productPrice || !productCategory || !productStock || !productPicture) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("category", productCategory);
    formData.append("stock", productStock);
    formData.append("image", productPicture);
              
    
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="my-4">Add Product</h2>

          {/* Error message (display if needed) */}
          {status === 'failed' && (
            <div className="alert alert-danger" role="alert">
              Failed to add product
            </div>
          )}
          
          {/* Loading message (display while adding product) */}
          {status === 'loading' && (
            <div className="alert alert-info" role="alert">
              Adding product...
            </div>
          )}

          {/* Product Name Input */}
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name:</label>
            <input
              type="text"
              id="productName"
              className="form-control input-sm"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Product Price Input */}
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              className="form-control input-sm"
              placeholder="Enter product price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          {/* Product Category Input */}
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">Product Category:</label>
            <input 
              type="text"
              id="productCategory" 
              className="form-control input-sm" 
              placeholder="Enter product category" 
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}/>
          </div>

          {/* Product Stock Input */}
          <div className="mb-3">
            <label htmlFor="productStock" className="form-label">Product Stock:</label>
            <input
              type="number"
              id="productStock"
              className="form-control input-sm"
              placeholder="Enter product stock"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            />
          </div>

          {/* Product Picture Input */}
          <div className="mb-3">
            <label htmlFor="productPicture" className="form-label">Product Picture:</label>
            <input
              type="file"
              id="productPicture"
              className="form-control input-sm"
              // accept="image/*"
              onChange={(e)=> {if (e.target.files) {      
                setProductPicture(e.target.files[0])
                console.log(e.target.files[0].name);
                ;
              }
              }}
            />
          </div>

          {/* Add Product Button */}
          <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};
