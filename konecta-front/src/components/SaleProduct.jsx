import React, { useEffect, useState } from 'react'
import { endpoint } from './endpoint'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

const SaleProduct = () => {
    const token = sessionStorage.getItem('token');
    const [product_id, setProduct_id] = useState('')
    const [sale_id, setSale_id] = useState('')
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(false);
    const [errmessage, setErrmessage] = useState(false);

    const [products, setProducts] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + token
        };

        await axios.get(`${endpoint}/products`, { headers: headers })
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }

    const store = async (e) => {
        e.preventDefault()

        const payload = {
            product_id: product_id,
            sale_id: sale_id,
            quantity: quantity,
            price: price,

        }
        console.log(payload);
        await axios.post(`${endpoint}/saleproduct`,
            payload)
            .then(res => {
                console.log(res.data);
                if (res.data.code === 25) {
                    setError(true)
                    return
                }
                if (res.data.stock < 0) {
                    setErrmessage(true)
                    return

                }
                navigate('/home')

            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className=" bg-slate-400 w-3/4 rounded-3xl flex  justify-center items-center">
                <form onSubmit={store}>
                    <div className='mb-3 p-1 text-xl'>
                        <label htmlFor='description' className=''>Nombre</label>
                    </div>
                    <div className='mb-3 p-1 text-xl'>

                        <select name="nameproduct" className='w-56 rounded-xl' id="nameproduct" onChange={(e) => setProduct_id(e.target.value)}>
                            <option value="">seleccione</option>
                            {
                                products.map((item, i) => (
                                    <option key={"categoria" + i} value={i + 1}> {item.name_product}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mb-3 p-1 text-xl'>
                        <label htmlFor='saleid' className=''>factura N°</label>
                    </div>

                    <div className='mb-3 p-1 text-xl'>
                        <input type='text' className='rounded-xl' id='saleid' value={sale_id} onChange={(e) => setSale_id(e.target.value)} />
                    </div>


                    <div className='mb-3 p-1 text-xl'>
                        <label htmlFor='stock' className='rounded-xl'>Cantidad</label>
                    </div>
                    <div className='mb-3 p-1 text-xl'>
                        <input type='text' className='rounded-xl' id='stock' value={quantity} onChange={(e) => setQuantity(e.target.value)} />


                    </div>

                    <div className='mb-3 p-1 text-xl'>
                        <label htmlFor='price' className=''>Precio</label>
                    </div>
                    <div className='mb-3 p-1 text-xl'>
                        <input type='text' className='rounded-xl' id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    {error && <div className='text-red-500 '>ya existe el numero de factura</div>}
                    {errmessage && <div className='text-red-500 '>no existe stock suficiente para realizar la venta</div>}
                    <div className='mb-14 mt-14 p-1 text-xl flex  justify-center items-center'>
                        <button type="submit" className=" bg-blue-500 text-xl w-28 h-10 rounded-xl ">Guardar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SaleProduct