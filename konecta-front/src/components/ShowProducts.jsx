import React from 'react'

const ShowProducts = () => {

    const mitoken = sessionStorage.getItem('token');
    console.log("mitoken=", mitoken);
  return (
    <div>ShowProducts</div>
  )
}

export default ShowProducts