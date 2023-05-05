import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoint } from './../endpoint'

const Form = (props: any) => {
  const token = sessionStorage.getItem('token');
  const { store,
    name_product, setName_product,
    reference, setReference,
    price, setPrice,
    category_id, setCategory_id,
    weight, setWeight,
    stock, setStock,
  } = props
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
  }, [])

  const getAllCategories = async () => {
    let headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
    };

    await axios.get(`${endpoint}/categories`, { headers: headers })
      .then(res => {
        // console.log(res.data);
        setCategories(res.data)
      })
      .catch(err => console.log(err))
  }
  //console.log(categories);
  return (
    <>
      <div className=" bg-slate-400 w-3/4 rounded-3xl flex  justify-center items-center">
        <form onSubmit={store}>
          <div className='mb-3 p-1 text-xl'>
            <label htmlFor='description' className=''>Nombre</label>
          </div>
          <div className='mb-3 p-1 text-xl'>
            <input type='text' className='rounded-xl' id='nameproduct' value={name_product} onChange={(e) => setName_product(e.target.value)} />
          </div>

          <div className='mb-3 p-1 text-xl'>
            <label htmlFor='reference' className=''>Referencia</label>
          </div>
          <div className='mb-3 p-1 text-xl'>
            <input type='text' className='rounded-xl' id='reference' value={reference} onChange={(e) => setReference(e.target.value)} />
          </div>

          <div className='mb-3 p-1 text-xl'>
            <label htmlFor='category_id' className='rounded-xl'>Categoria</label>
          </div>
          <div className='mb-3 p-1 text-xl'>

            <select name="category_id" className='w-56 rounded-xl' id="category_id" onChange={(e) => setCategory_id(e.target.value)}>
              <option value="">seleccione</option>
              {
                categories.map((item, i) => (
                  <option key={"categoria" + i} value={i + 1}> {item.category_name}</option>
                ))
              }
            </select>

          </div>
          <div className='mb-3 p-1 text-xl'>
            <label htmlFor='stock' className='rounded-xl'>Cantidad</label>
          </div>
          <div className='mb-3 p-1 text-xl'>
            <input type='text' className='rounded-xl' id='stock' value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>

          <div className='mb-3 p-1 text-xl'>
            <label htmlFor='price' className=''>Precio</label>
          </div>
          <div className='mb-3 p-1 text-xl'>
            <input type='text' className='rounded-xl' id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className='mb-3 p-1 text-xl'>
            <label htmlFor='weight' className=''>Peso</label>
          </div>

          <div className='mb-3 p-1 text-xl'>
            <input type='text' className='rounded-xl' id='weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className='mb-14 mt-14 p-1 text-xl flex  justify-center items-center'>
            <button type="submit" className=" bg-blue-500 text-xl w-28 h-10 rounded-xl ">Guardar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Form