//import React from 'react'
import { useState } from 'react';
import { endpoint } from './endpoint'
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [credentialsError, setCredentialsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setError(true)
            return
        }
        setError(false)

        const payload = {
            "email": email,
            "password": password
        }
        axios.post(`${endpoint}/login`, payload)
            .then(res => {
                console.log(res.status);
                console.log("midata", res.data.access_token);
                //const redirect = json(res)
                if (res.status === 200) {
                    sessionStorage.setItem('token', res.data.access_token);
                    //console.log("token=", res.data.token);
                    window.location.href = '/home';
                }
                console.log("email=", email, "password=", password);
                console.log("redirect=", redirect.status);
                setCredentialsError(false)

            })
            .catch(err => {
                console.log(err.response.status);
                if (err.response.status === 401) {
                    setCredentialsError(true)
                }
            })
    }
    return (
        <div className='flex justify-center' >
            <div className='grid md:grid-cols-2 w-full h-screen'>
                <div className='bg-slate-600 flex  justify-center items-center'>
                    <div className=" bg-slate-400 w-3/4 rounded-3xl flex  justify-center items-center">
                        <form onSubmit={handleSubmit} className=' mb-4 '>

                            <h2 className='text-slate-600 font-bold text-2xl p-4'>Ingresa con tu email</h2>

                            <div className="">
                                <div>
                                    <label className="p-4 text-xl" >Email address</label>
                                </div>

                                <div className='p-2'>
                                    <input onChange={(e) => setEmail(e.target.value)}
                                        type="email" name="email" id="email" className="p-1 w-72 text-xl rounded-xl" placeholder='tucorreco@gmail.com' />
                                </div>
                            </div>

                            <div className=" ">
                                <div>

                                    <label className="p-4 text-xl" >Password</label>
                                </div>
                                <div className='p-2'>
                                    <input onChange={(e) => setPassword(e.target.value)}
                                        type="password" name="password" id="password" className="p-1 w-72 text-xl rounded-xl" placeholder='password' />
                                </div>
                            </div>

                            {credentialsError && <div className='text-red-500 '>Usuario o contraseña incorrectos</div>}
                            <div className='mb-4 mt-6 flex justify-center items-center'>

                                <button type="submit" className=" bg-blue-500 text-xl w-28 h-10 rounded-2xl ">Ingresar</button>
                            </div>

                        </form>

                    </div>
                </div>


                <div className='bg-slate-600 flex  justify-center items-center'>
                    <div className=' flex flex-col text-white login-form-konecta'>
                        <div>
                            Prueba tecnica
                        </div>
                        <div>
                            grupokonecta
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login