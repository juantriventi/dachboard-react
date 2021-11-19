import React, {useState} from 'react';
import DetalleProducto from '../DetalleProducto';

const BuscarProducto = () => {

    const [nombre, setNombre] = useState("")
    const [product, setProduct] = useState(null)

    const handleOnChange = (event)=> {

        console.log(event.target.value);
        setNombre(event.target.value);
    }

    const getProductByName = async(name) => {
       
        const request = await fetch(`http://localhost:3000/api/v1/products/${name}`);
        const response = await request.json();

        const {product} = response.data;
        setProduct(product);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        getProductByName(nombre);
    }

    return (
        <div>
           <form onSubmit={handleOnSubmit}>
                <label htmlFor="name">id del producto</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    onChange={handleOnChange} 
                    value={nombre}
                    />

                <button type="submit">Buscar</button>   
            </form> 
            <section>
                { product === null? 
                    <p style={{color:'red'}}>No se encontro producto</p>
                    :
                    <div>
                        <h3>Detalle</h3>
                        <DetalleProducto product={product}/>
                    </div>
                    
                }
            </section>
        </div>
    )
}

export default BuscarProducto