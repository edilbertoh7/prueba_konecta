import { Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './components/Login'
import ShowProducts from './components/ShowProducts'
import Home from './components/Home'
import NewProduct from './components/NewProduct'
import EditProduct from './components/EditProduct'
import SaleProduct from './components/SaleProduct'

function App() {

  const token = sessionStorage.getItem('token');
//console.log("token=", token);
  return (
    <>
      <Routes>
        
        <Route path="/" element={<Login />} />
        
        {
        token  && <>
        <Route path='/show' element={<ShowProducts />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/newproduct" element={<NewProduct />} /> 
        <Route path='/editproduct/:id' element={<EditProduct />} />
        <Route path='/saleproduct' element={<SaleProduct />} />
        </>
        }

      </Routes>
    </>
  )
}

export default App
