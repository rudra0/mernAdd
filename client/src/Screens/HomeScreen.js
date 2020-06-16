import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProduct } from '../actions/productActions';


export default function HomeScreen () {

    
    const productList = useSelector(state => state.productList);
    
    const { products, loading, error } = productList;
    console.log(productList)
    const dispatch = useDispatch();
    
    

    useEffect(() => {
        
        dispatch(listProduct());
        
        
        return () =>
         {

         };
    
    },[])
    
        return <> {
            loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
              <ul className="products">
                {
                  products.map(product =>
                    <li key={product._id}>
                      <div className="product">
                        <Link to={'/product/' + product._id}>
                          <img className="product-image" src={product.image} alt="product" />
      
                        </Link>
                        <div className="product-name">
                          <Link to={'/product/' + product._id}>{product.name}</Link>
                        </div>
                  <div className="product-brand">{product.brand}</div>
                        <div className="product-price">${product.price}</div>
                        <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                      </div>
                    </li>)
                }
              </ul>
        }
        </>
}

