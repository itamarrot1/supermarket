import React, { useEffect } from 'react'
import Card from './Card'
import { useAppDispatch, useAppSelector } from '../hooks';
import { get_products, selectProducts } from '../slicers/containerSlice';
import { selectCartItems } from '../slicers/cartSlicer';


const Container=() => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);


  useEffect(() => {
    dispatch(get_products())
  }, [])
  

  return (
    <div className="container">
    <div className="row">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map(product => (
          <div className="col-sm-4" key={product.id}>
            <Card product={product} />
            </div>
        ))
      )}
      </div>
  </div>

    
  )
}

export default Container;