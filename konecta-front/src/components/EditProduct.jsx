import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoint } from './endpoint'
import { useNavigate, useParams } from 'react-router-dom'
import Form from './partials/Form'

const EditProduct = () => {
    const token = sessionStorage.getItem('token');
    const [name_product, setName_product] = useState('')
    const [reference, setReference] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [weight, setWeight] = useState('');
    const [stock, setStock] = useState('');
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        const payload = {
            name_product: name_product,
            reference: reference,
            price: price,
            category_id: category_id,
            weight: weight,
            stock: stock,
        }
        await axios.put(`${endpoint}/updateproduct/${id}`,
            payload)
            .then(res => {
                console.log(res.data);
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const getProductById = async () => {
            const response = await axios.get(`${endpoint}/showproduct/${id}`)
            console.log(response.data);
            setName_product(response.data.name_product)
            setReference(response.data.reference)
            setPrice(response.data.price)
            setCategory_id(response.data.category_id)
            setWeight(response.data.weight)
            setStock(response.data.stock)
        }
        getProductById()

    }, [])

    return (
        <>
        <div className='flex  justify-center items-center mt-20 text-white font-bold text-2xl'>
            <h3>editar Prductos</h3>
        </div>
        <div className='flex  justify-center items-center mt-14'>
            <Form store={update}
                name_product={name_product} setName_product={setName_product}
                reference={reference} setReference={setReference}
                price={price} setPrice={setPrice}
                category_id={category_id} setCategory_id={setCategory_id}
                weight={weight} setWeight={setWeight}
                stock={stock} setStock={setStock}
                />
        </div>
                </>
    )
}

export default EditProduct