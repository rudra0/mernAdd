import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProduct, deleteProduct } from '../actions/productActions';


const ProductsScreen = (props)=>{
    const [ modalVisible, setModalVisible ] = useState(false)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setcountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('')
    
    
    const productDelete = useSelector(state=> state.productDelete);
    const productSave = useSelector(state=> state.productSave);
    const productList = useSelector(state=> state.productList);
    const { loading, products, error } = productList
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    
    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave)
        {
            setModalVisible(false);
        }
        dispatch(listProduct());
 
        return () => {
            
        }
    }, [ successSave, successDelete ])

    const submitHandler =(e)=>{
            e.preventDefault();
            dispatch(saveProduct( { _id:id, name, price, image, brand, category, countInStock, description } ));
           
    }

    const deleteHandler = (product) =>{

       
        dispatch(deleteProduct(product._id));
        
    }

    const openModal =(product)=>
    {
        setModalVisible(true)
        setId(product._id);
        setName(product.name);
        setPrice(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setcountInStock(product.countInStock);   

    }

    
    return( 
        <div className="content content-margined">
            <div className="product-header">
                <h2>Products</h2>
                
                <button className="button" onClick={()=>openModal({})}>Create Product</button>
            </div>
            {modalVisible && 
                 <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 style={{textAlign:"center", marginBottom:0}}>{id? "Edit Product":"Create Product"}</h2>
                    </li>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div style={{color:"red"}}>Please Login As An Admin.</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" value={name} id="name"  onChange={(e)=>setName(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="number" name="price" value={price} id="price"  onChange={(e)=>setPrice(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="text" name="image" id="image" value={image} onChange={(e)=>setImage(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input type="text" name="brand" id="brand" value={brand} onChange={(e)=>setBrand(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="countInStock">
                            Count In Stock
                        </label>
                        <input type="number" name="countInstock" id="countInStock" value={countInStock} onChange={(e)=>setcountInStock(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input type="text" name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea  name="description" id="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="input">
                        </textarea>
                    </li>

                   
                    <li>
                        <button type="submit" className="button primary">{id? "Update" : "Create"} </button>
                    </li>

                    <li>
                        <button type="button" className="button primary" onClick={()=>setModalVisible(false)}> Back </button>
                    </li>
                    
                     
                </ul>
            </form>
        </div>
}
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                        <tr key={ product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td className="action">
                                <button className="button" onClick={()=>openModal(product)}>Edit</button>
                                { ' '}
                                <button className="button" onClick={()=>deleteHandler(product)}>Delete</button>
                            </td>



                        </tr>))}
                        
                    </tbody>
                </table>
            </div>
        </div>


                

        
    )
}
export default ProductsScreen;
