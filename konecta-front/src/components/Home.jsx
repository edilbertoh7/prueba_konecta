import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { endpoint } from './endpoint'
import axios from "axios";

const Home = () => {
    const token = sessionStorage.getItem('token');
    //console.log("mitoken=", token);

    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + token
        };

        await axios.get(`${endpoint}/products`, {headers: headers})
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }
    const deleteProduct = async (id) => {
        const ok = await axios.delete(`${endpoint}/deleteproduct/${id}`)
        getAllProducts()
    }
    return (
        <>
            <div className='flex justify-center' >
                <div className='grid  w-full h-screen'>

                    <div className='bg-slate-600 flex  justify-center items-center'>

                        <div className='d-grid gap-2  w-full pl-1 pr-1'>
                            <div className='flex  justify-center items-center'>

                            <Link to='/newproduct' className='bg-blue-600 h-10 text-xl rounded-lg mr-10 mb-5 text-white font-bold w-44 p-1 pl-2' 
                            type='button'>Nuevo Producto</Link>
                            <Link to='/saleproduct' className='bg-green-600 h-10 text-xl rounded-lg ml-10 mb-5 text-white font-bold w-40 p-1 pl-2' 
                            type='button'>Realizar venta</Link>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-bold">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Referencia
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Precio
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Peso
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Disponibles
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Acciones
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                
                                                <td className="px-6 py-4">
                                                    {product.name_product}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.reference}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.weight}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.stock}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link to={`/editproduct/${product.id}`} className='bg-yellow-600 text-white rounded'>Editar</Link>
                                                    <button onClick={() => deleteProduct(product.id)} 
                                                    className='bg-red-400 font-bold text-white  rounded'>Borrar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>




                        </div>


                    </div>

                </div>
            </div >
        </>
    )
}

export default Home