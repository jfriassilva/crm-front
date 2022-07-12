import {useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import usuarioAxios from "../config/usuarioAxios"
import Alerta from "../componentes/Alerta"

const NuevoPassword = () => {

    const[password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})
    const[passwordModificada, setPasswordModificada] = useState(false)

    const params = useParams()
    const {token} = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
            await usuarioAxios(`/usuarios/olvide-password/${token}`)
            setTokenValido(true)
            
            } catch (error) {
                setAlerta ({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg:'la contraseña debe ser minimo 6 caracteres',
                error: true
            })
            return
        }

        try {
           const url = `/usuarios/olvide-password/${token}`
           
           const {data} = await usuarioAxios.post(url, {password})

           setAlerta({
            msg: data.msg,
            error: false
           })
           setPasswordModificada(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
      <>
      <h1 className="text-teal-600 font-black text-6xl capitalize text-center">Restablecer Contraseña</h1>

        {msg && <Alerta alerta={alerta}/>} 

      {tokenValido && (
            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Nueva Contraseña</label>
                <input
                    id="password"
                    type="password" 
                    placeholder="Escribe tu nueva contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <input type="submit" value="Guardar contraseña" className="bg-teal-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-teal-800 transition-colors"/>
        </form>
     )}
        {passwordModificada && (
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
                >Inicia Sesión
            </Link>
        )}

    </> 
  )
}
  
  export default NuevoPassword