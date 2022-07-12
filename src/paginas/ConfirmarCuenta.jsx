import {useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"
import usuarioAxios from "../config/usuarioAxios"
import Alerta from "../componentes/Alerta"

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [alerta, setAlerta] = useState({})

const params = useParams();
const {id} = params

useEffect(() => {
  const ConfirmarCuenta = async () => {
    try {
      const url = `/usuarios/confirmar/${id}`
      const { data } = await usuarioAxios(url)

      setAlerta({
        msg: data.msg,
        error: false
      })
      
      setCuentaConfirmada(true)

    } catch (error){
        setAlerta ({
          msg: error.response.data.msg,
          error: true
      })
    }
  }
  ConfirmarCuenta();
}, [])

  const { msg } = alerta

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize text-center">Confirma tu Cuenta</h1>
    
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alerta alerta= {alerta} />}

      {cuentaConfirmada && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
          >Inicia Sesión
        </Link>
      )}
    </div>
    </>
  )
}

export default ConfirmarCuenta