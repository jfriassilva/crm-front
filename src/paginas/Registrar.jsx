import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../componentes/Alerta"
import usuarioAxios from "../config/usuarioAxios"

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error:true
            })
        return 
        }

        if(password !== repetirPassword) {
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error:true
            })
        return 
        }

        if(password.length < 6) {
            setAlerta({
                msg: 'La contraseña es muy corta , minimo 6 caracteres',
                error:true
            })
        return 
        }

        setAlerta({})

        try {
            const {data} = await usuarioAxios.post(`/usuarios`,{nombre, email, password} )

            setAlerta({
               msg: data.msg,
               error: false 
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

        const {msg} = alerta

  return (
    <>
        <h1 className="text-teal-600 font-black text-6xl capitalize text-center">Crea tu cuenta y administra tus
        <span className="text-slate-700"> pacientes</span></h1>

        <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="nombre"
                >Nombre</label>
                <input
                    id="nombre"
                    type="text" 
                    placeholder="Tu Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email" 
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Contraseña</label>
                <input
                    id="password"
                    type="password" 
                    placeholder="Contraseña de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password2"
                >Repetir Contraseña</label>
                <input
                    id="password2"
                    type="password" 
                    placeholder="Repetir Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>
            <input type="submit" value="Crear cuenta" className="bg-teal-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-teal-800 transition-colors"/>
        </form>

        { msg && <Alerta alerta={alerta}/> }

        <nav className="lg:flex lg:justify-between">
            <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
            >
            ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/olvide-password"
            >
            Olvide mi Contraseña
            </Link>
        </nav>
    
    
    </>
  )
}

export default Registrar