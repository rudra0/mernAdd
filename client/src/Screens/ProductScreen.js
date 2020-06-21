import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailProduct } from '../actions/productActions';

const ProductScreen = (props)=>{
    
    const [qty, setqty] = useState(1)
    const  productDetail = useSelector(state=>state.productDetail);
    
    const dispatch = useDispatch();
    const { products, loading, error } = productDetail;
    
    
   
    useEffect(() => {
        dispatch(detailProduct(props.match.params.id));
        return () => {
            
        }
    }, [])

    const handleCart =() =>{
        props.history.push("/cart/" + props.match.params.id +"?qty=" + qty);
    }
    return(
        loading? <div>Loading Product...</div>:
        error? <div>{error}</div>:
        <div >
            <div className="routePath">
                <Link to='/'>Back To Home</Link>
            </div>
            <div className="details">
                <div className="details-image">
                    <img src={products.image} />
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{products.name}</h4>
                        </li>
                        <li>
                            {products.rating} Stars ({products.numReviews} Reviews)
                        </li>
                        <li>
                            
                           <b>Price: ₹{products.price}</b> 
                        </li>
                        <li>
                            Description:
                            <div>
                                {products.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            <b>Price: ₹{products.price}</b>
                        </li>
                        <li>
                            <div> Status: {products.countInStock>0 ? <div> In Stock </div>: <div style={{color:"red"}}>Out Of Stock..</div> }</div>
                        </li>
                        <li>
                            Qty: <select value = {qty} onChange = { (e)=>setqty( e.target.value ) }>
                               { [...Array(products.countInStock).keys()].map(x=>
                                <option value= { x + 1 } key={x+1}>{ x + 1 }</option>
                                )}
                                
                            </select>
                        </li>
                        <li>
                            {products.countInStock>0 ?
                            <button className="button" onClick = { handleCart }>Add To Cart..</button>
                            :<div style={{color:"red"}}> N.A</div>}
                        </li>
                    </ul>

                </div>

            </div>
            

        </div>
    )
}

export default ProductScreen;
